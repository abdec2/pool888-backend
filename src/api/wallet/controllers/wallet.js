'use strict';

/**
 * wallet controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wallet.wallet', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async walletExist(ctx) {

        let wallets = await strapi.entityService.findMany(
            "api::wallet.wallet", { filters: { walletName : ctx.query.WalletName }}
          );
          return !(wallets.length === 0);
    },

    async getAllParents(ctx) {

        let childWalletId = ctx.query.walletId
      
        const parentWaletId = strapi.service("api::wallet.wallet").getParentWallet(childWalletId)
      
        return parentWaletId
    }
          

}))