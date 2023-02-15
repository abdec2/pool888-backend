'use strict';

/**
 * transaction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::transaction.transaction', ({ strapi }) =>  ({
      // Method 1: Creating an entirely custom action
    async findByWallet(ctx) {
        console.log(ctx.request.query.wallet_id)
        const lang = ctx.request.query.lang
        console.log(lang)

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
                  },
                  parent_wallet:{
                    populate: {
                        package: true, users_permissions_user: true, pool:true
                    }
                  } 
                }, 
                orderBy: 'createdAt'
            });

            
            const type_name_cn = {
                                  "package" : "配套", 
                                  "feededucted": "扣除费用", 
                                  "staking": "质押", 
                                  "tokenspurchase": "代币购买", 
                                  "harvest":"收获", 
                                  "withdrawal": "取款", 
                                  "commission": "佣金", 
                                  "gratitude": "感谢" 
                                }

            const package_cnames= {
                                  "Platinum" : "白金配套",
                                  "Gold" : "金子",
                                  "Silver": "银",
                                  "Bronze": "青铜",
                                  "Freedom": "自由"
                                }
  
            if ( lang === "en") {
            
              const transactionWDetail = await Promise.all(transactions.map(async item => {

              let description = null;
              let amount = null

                          
              if (item.type === 'package') {

                description = `Acquisition of ${item.wallet.package.name} package`
                const staked_amount = item.amount
                amount = item.wallet.package.name !== "Freedom"? `${item.wallet.package.value} ${item.wallet.pool.currency}`: `${staked_amount} ${item.wallet.pool.currency}`
                            
              } else if (item.type === 'feededucted') {  

                description = `5% fee deduction`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'staking') {
                if (item.wallet.package.name !== "Freedom") description = `60% of package value stake and mint 888 tokens`
                else description = "100% amount stake and mint 888 tokens"
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'tokenspurchase') {

                description = `40% of package value buys 888 tokens`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'harvest') {

                description = `888 tokens harvested/claimed` 
                amount = `${item.amount} `          

              } else if (item.type === 'withdrawal') {

                description = `Withdrawal of Staked Amount`
                amount = `${item.amount} ${item.wallet.pool.currency}`  

              } else if (item.type === 'commission'){

                description = `Received commission from ${item.referral.child_wallet.wallet_id}`  
                amount = `${item.amount} ` 

              }  else if (item.type === 'gratitude'){

                description = `Received gratitude reward from ${item.parent_wallet.wallet_id}`  
                amount = `${item.amount} `  
              }
                return {
                  "TRANSACTION_TIME" : item.createdAt,
                  "TYPE" : item.type,
                  "DESCRIPTION" : description,
                  "AMOUNT": amount
                }
              })) 
              
              return transactionWDetail;

            } else if (lang === "cn") {

              const transactionWDetail = await Promise.all(transactions.map(async item => {

                let description = null;
                let amount = null
  
                            
                if (item.type === 'package') {

                  description = `获得${package_cnames[item.wallet.package.name]}包裹`
                  const staked_amount = item.amount
                  amount = item.wallet.package.name !== "Freedom"? `${item.wallet.package.value} ${item.wallet.pool.currency}`: `${staked_amount} ${item.wallet.pool.currency}`
                              
                } else if (item.type === 'feededucted') {  
  
                  description = `5% 费用减免`
                  amount = `${item.amount} ${item.wallet.pool.currency}`
  
                } else if (item.type === 'staking') {
                  if (item.wallet.package.name !== "Freedom") description = `60% 的 配套价值质押铸造 888 代币`
                  else description = "100% 的质押和铸造 888 代币"
                  amount = `${item.amount} ${item.wallet.pool.currency}`
  
                } else if (item.type === 'tokenspurchase') {
  
                  description = `40% 的配套价值购买 888 代币`
                  amount = `${item.amount} ${item.wallet.pool.currency}`
  
                } else if (item.type === 'harvest') {
  
                  description = `收获/领取 888 代币` 
                  amount = `${item.amount} `          
  
                } else if (item.type === 'withdrawal') {
  
                  description = `提取质押金额`
                  amount = `${item.amount} ${item.wallet.pool.currency}`  
  
                } else if (item.type === 'commission'){
  
                  description = `收到 ${item.referral.child_wallet.wallet_id} 的佣金`  
                  amount = `${item.amount} ` 
  
                }  else if (item.type === 'gratitude'){
  
                  description = `收到 ${item.parent_wallet.wallet_id} 的感谢奖励`  
                  amount = `${item.amount} `  
                }
                  return {
                    "TRANSACTION_TIME" : item.createdAt,
                    "TYPE" : type_name_cn[item.type],
                    "DESCRIPTION" : description,
                    "AMOUNT": amount
                  }
                })) 
                
                return transactionWDetail;

            }

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
                  },
                  parent_wallet:{
                    populate: {
                        package: true, users_permissions_user: true, pool:true
                    }
                  } 
                }, 
                orderBy: 'createdAt'
            });

            const transactionWDetail = transactions.map(async item => {

              let description = null;
              let amount = null

              if (item.type === 'package') {

                description = `Acquisition of ${item.wallet.package.name} package`
                amount = `${item.amount} ${item.wallet.pool.currency}`
                            
              } else if (item.type === 'feededucted') {  

                description = `5% fee deduction`
                amount = `${item.amount} ${item.wallet.pool.currency}`

              } else if (item.type === 'staking') {

                description = `60% of package value stake and mint 888 tokens`
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

              } else if (item.type === 'gratitude'){

                description = `Received gratitude reward from ${item.parent_wallet_id}`  
                amount = `${item.amount} 888`  
              }
              return {
                "TRANSACTION_TIME" : item.createdAt,
                "TYPE" : item.type,
                "DESCRIPTION" : description,
                "AMOUNT": amount
              }              
              })
                          
            return transactionWDetail;

        } catch(e) {
            console.log(e)
        }
    },
    
}))
