'use strict';

/**
 * A set of functions called "actions" for `referral-add`
 */

 module.exports = {
  addref: async (ctx, next) => {
    try {
      const users = await strapi.entityService.findMany('api::wallet.wallet', {
        sort: {id: 'ASC'}
      })
      users.map(async item => {
        let connected_wallet =  item; 
        let current_package_value = 0;
        let current_wallet = connected_wallet

        for(let level = 1; level <= 4; level++) {
          let parent_wallet = await strapi.service('api::referral-add.referral-add').parentOf(current_wallet);
          if(parent_wallet){
            if((parent_wallet.parent_wallet_id === null) || (parent_wallet.package.level > current_package_value)) {
              await strapi.service('api::referral-add.referral-add').createReferral(parent_wallet, connected_wallet, level);
            }
          }
          current_wallet = parent_wallet;
          current_package_value++;
        }
      })
       ctx.send(JSON.stringify(users))
      //ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};