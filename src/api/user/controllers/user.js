'use strict';

const { text } = require("express");


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
   
  }
}
