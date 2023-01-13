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
                        package: true, users_permissions_user: true, pool:true
                    }
                  }, 
                  referral: {
                    populate: {
                      parent_wallet: {
                       package: true, users_permissions_user:true, pool:true
                      },                       
                      child_wallet: {
                        package: true, users_permissions_user:true, pool:true
                       }
                    }
                  }
                }, 
                orderBy: 'createdAt'
            });

            const transactionWDetail = Promise.all(transactions.map(async item => {

              let description = null;
              let amount = null

              if (item.type === 'package') {

                description = `Acquisition of ${item.wallet.package.name} package`
                amount = `${item.amount} ${item.wallet.pool.currency}`
                            
              } else if (item.type === 'feededucted') {  

                description = `5% fee deduction`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'staking') {

                description = `60% of package value stake 888 tokens`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'tokenspurchase') {

                description = `40% of package value buys 888 tokens`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'harvest') {

                description = `888 tokens harvested/claimed` 
                amount = `${item.amount} 888`          

              } else if (item.type === 'withdrawal') {

                description = `Withdrawal of Staked Amount`
                amount = `${item.amount} ${item.wallet.pool.currency}`  

              } else if (item.type === 'commission'){

                description = `Received commission from ${item.referal.child_wallet.wallet_id}`  
                amount = `${item.amount} 888`  
              }
                return {
                  "TRANSACTION TIME" : item.createdAt,
                  "DESCRIPTION": description,
                  "AMOUNT": amount
                }
              }))                                   

            return transactionWDetail;

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
                      package: true, users_permissions_user: true, pool:true
                    }
                  }, 
                  referral: {
                    populate: {
                      parent_wallet: {
                       package: true, users_permissions_user:true, pool:true
                      },                       
                      child_wallet: {
                        package: true, users_permissions_user:true, pool:true
                       }
                    }
                  }
                }, 
                orderBy: 'createdAt'
            });

            const transactionWDetail = Promise.all(transactions.map(async item => {

              let description = null;
              let amount = null

              if (item.type === 'package') {

                description = `Acquisition of ${item.wallet.package.name} package`
                amount = `${item.amount} ${item.wallet.pool.currency}`
                            
              } else if (item.type === 'feededucted') {  

                description = `5% fee deduction`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'staking') {

                description = `60% of package value stake 888 tokens`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'tokenspurchase') {

                description = `40% of package value buys 888 tokens`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'harvest') {

                description = `888 tokens harvested/claimed` 
                amount = `${item.amount} 888`          

              } else if (item.type === 'withdrawal') {

                description = `Withdrawal of Staked Amount`
                amount = `${item.amount} ${item.wallet.pool.currency}`  

              } else if (item.type === 'commission'){

                description = `Received commission from ${item.referal.child_wallet.wallet_id}`  
                amount = `${item.amount} 888`  
              }
                return {
                  "TRANSACTION TIME" : item.createdAt,
                  "DESCRIPTION": description,
                  "AMOUNT": amount
                }                   

              }))  
                          
            return transactionWDetail;

        } catch(e) {
            console.log(e)
        }
    },
    
}))
