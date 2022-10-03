'use strict';

const { text } = require("express");
const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('@strapi/plugin-users-permissions/server/utils');
const {
  validateCallbackBody,
  validateRegisterBody,
  validateSendEmailConfirmationBody,
  validateForgotPasswordBody,
  validateResetPasswordBody,
  validateEmailConfirmationBody,
  validateChangePasswordBody,
} = require('@strapi/plugin-users-permissions/server/controllers/validation/auth');

const { getAbsoluteAdminUrl, getAbsoluteServerUrl, sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state;
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return sanitize.contentAPI.output(user, userSchema, { auth });
};

module.exports = {
 
  userNameExist: async (ctx, next) => {
    let users = await strapi.entityService.findMany(
      "plugin::users-permissions.user", { filters: { username: ctx.query.username }}
    );
    return !(users.length === 0);
  },

  userEmailExist: async (ctx, next) => {
    let users = await strapi.entityService.findMany(
      "plugin::users-permissions.user", { filters: { email: ctx.query.email }}
    );
    return !(users.length === 0);
  },

  sendReferralMail: async (ctx, next) => {

    const {i_email, r_email, r_username} = JSON.parse(ctx.request.body);
    
    const register_url = process.env.REGISTER_PAGE_URL+"?i_email="+ i_email + "&r_email=" + r_email 
    + "&r_username="+ r_username

    await strapi
    .plugin('email')
    .service('email')
    .send({
        to: i_email,
        from: process.env.SMTP_USERNAME,
        subject: '888 Staking Referral',
        html: `<div>
        <h4>You are invited to start 888 Staking by <span style="color:red">`+ r_username +
        `</span>. Kindly, click on the link below to register</h4>` 
        + register_url        

    }).then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
   
  },

  signIn: async (ctx, next) => {
    const provider = ctx.params.provider || 'local';
    const params = ctx.request.body;

    const store = strapi.store({ type: 'plugin', name: 'users-permissions' });

    await validateCallbackBody(params);

    const { identifier } = params;

    // Check if the user exists.
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: {
        provider,
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      },
      populate: {role: true}
    });
    if (!user) {
      throw new ValidationError('Invalid identifier or password');
    }

    if (!user.password) {
      throw new ValidationError('Invalid identifier or password');
    }

    const validPassword = await getService('user').validatePassword(
      params.password,
      user.password
    );

    if (!validPassword) {
      throw new ValidationError('Invalid identifier or password');
    }

    const advancedSettings = await store.get({ key: 'advanced' });
    const requiresConfirmation = _.get(advancedSettings, 'email_confirmation');

    if (requiresConfirmation && user.confirmed !== true) {
      throw new ApplicationError('Your account email is not confirmed');
    }

    if (user.blocked === true) {
      throw new ApplicationError('Your account has been blocked by an administrator');
    }

    return ctx.send({
      jwt: getService('jwt').issue({ id: user.id }),
      user: await sanitizeUser(user, ctx),
      role: user.role
    });

  }
}
