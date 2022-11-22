'use strict';

/**
 * wallet controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wallet.wallet', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async walletExist(ctx) {

        let wallets = await strapi.entityService.findMany(
            "api::wallet.wallet", { filters: { wallet_id : ctx.query.parent_wallet_id }}
          );
          return !(wallets.length === 0);
    },

    async userHasWallet(ctx){

        let wallets = await strapi.entityService.findMany(
            "api::wallet.wallet", { filters: { users_permissions_user : ctx.query.user_id }}
          );
          return (wallets.length !== 0);
    }


}))