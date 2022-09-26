'use strict';

/**
 * referral-add service
 */

module.exports = () => ({
    async parentOf(wallet) {
        try {
            const parent = await strapi.db.query('api::wallet.wallet').findOne({
                where: {wallet_id: wallet.parent_wallet_id},
                populate: { package: true }
            })
            return parent;
        } catch(e) {
            console.log('error: ', wallet)
        }
    },

    async createReferral(parent, child, level) {
        try{
            const referral = await strapi.entityService.create('api::referral.referral', {
                data: {
                    parent_wallet: parent.id,
                    child_wallet: child.id,
                    level: level,
                    publishedAt: new Date().toISOString()
                }
            })
        } catch(e) {
            console.log(e);
        }
    },

});
