'use strict';


module.exports = {
 
  userExist: async (ctx, next) => {
    let users = await strapi.entityService.findMany(
      "plugin::users-permissions.user", { filters: { username: ctx.query.username }}
    );
    return !(users.length === 0);
  }
};
