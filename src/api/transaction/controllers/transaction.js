'use strict';

/**
 * transaction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::transaction.transaction', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async findByWallet(ctx) {
        console.log(ctx.request.query.wallet_id)
        try {
            const transactions = await strapi.db.query('api::transaction.transaction').findMany({
                where: {wallet : ctx.request.query.wallet_id},
                populate: {
                  wallet: {
                    populate: {
                      package: true, users_permissions_user: true
                    }
                  }, 
                  referral: {
                    populate: {
                      parent_wallet: {
                       package: true, users_permissions_user:true
                      },                       
                      child_wallet: {
                        package: true, users_permissions_user:true
                       }
                    }
                  }
                }, 
                orderBy: 'createdAt'
            });
            return transactions;

        } catch(e) {
            console.log(e)
        }
    },

    async findByUser(ctx) {

        console.log(ctx.request.query.userid)
        try {
            const transactions = await strapi.db.query('api::transaction.transaction').findMany({
                where: {users_permissions_user : ctx.request.query.userid},
                populate: {
                  wallet: {
                    populate: {
                      package: true, users_permissions_user: true
                    }
                  }, 
                  referral: {
                    populate: {
                      parent_wallet: {
                       package: true, users_permissions_user:true
                      },                       
                      child_wallet: {
                        package: true, users_permissions_user:true
                       }
                    }
                  }
                }, 
                orderBy: 'createdAt'
            });
            return transactions;

        } catch(e) {
            console.log(e)
        }
    },
    
}))
