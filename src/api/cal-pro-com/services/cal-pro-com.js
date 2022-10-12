'use strict';

/**
 * cal-pro-com service
 */

module.exports = () => ({
    async getReferral(harvesterId) {
        try {
            const referral = await strapi.db.query('api::referral.referral').findMany({
                where: {parent_wallet: harvesterId},
                populate: {
                  parent_wallet: {
                    populate: {
                      package: true
                    }
                  }, 
                  child_wallet: {
                    populate: {
                      package: true
                    }
                  }
                }, 
                orderBy: 'id'
            });
            return referral;

        } catch(e) {
            console.log('getReferral: ', e)
        }
    },

    async getUserWallet(id) {
        try {
            const userWallet = await strapi.db.query('api::wallet.wallet').findOne({
                where: {id: id},
                populate: {
                    package: true
                }
            });
            return userWallet;

        } catch(e) {
            console.log('getUserWallet: ', e)
        }
    },

    getTimeDifference(endDate, startDate) {
        const msInMinutes = 60 * 1000;
        return Math.round(
            Math.abs(endDate - startDate) / msInMinutes
        );
    },

});
