'use strict';

/**
 * A set of functions called "actions" for `referral-add`
 */

module.exports = {
  addref: async (ctx, next) => {
    try {
      const {id} = ctx.request.query;
      const item = await strapi.entityService.findOne('api::wallet.wallet', id, {})
      let connected_wallet = item;
      let current_package_level = 0;
      let current_wallet = connected_wallet

      for (let level = 1; level <= 4; level++) {
        let parent_wallet = await strapi.service('api::referral-add.referral-add').parentOf(current_wallet);
        if (parent_wallet) {
          if (parent_wallet.package !== null && parent_wallet.package.level > current_package_level) {
            await strapi.service('api::referral-add.referral-add').createReferral(parent_wallet, connected_wallet, level);
            strapi.service('api::referral-add.referral-add').sendEmailToReferrer(parent_wallet, connected_wallet, level);
          }
        }
        else break;
        current_wallet = parent_wallet;
        current_package_level++;
      }

      // const users = await strapi.entityService.findMany('api::wallet.wallet', {
      //   sort: {id: 'ASC'}
      // })
      // users.map(async item => {
      //   let connected_wallet =  item; 
      //   let current_package_level = 0;
      //   let current_wallet = connected_wallet

      //   for(let level = 1; level <= 4; level++) {
      //     let parent_wallet = await strapi.service('api::referral-add.referral-add').parentOf(current_wallet);
      //     if(parent_wallet){ 
      //       if(parent_wallet.package !== null && parent_wallet.package.level > current_package_level) {
      //           await strapi.service('api::referral-add.referral-add').createReferral(parent_wallet, connected_wallet, level);
      //       }
      //     }
      //     else break;
      //     current_wallet = parent_wallet;
      //     current_package_level++;
      //   }
      // })
      ctx.send(JSON.stringify(item))
      //ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
    return
  }
};