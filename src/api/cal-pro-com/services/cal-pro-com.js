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
                orderBy: 'level'
            });
            return referral;

        } catch(e) {
            console.log('getReferral: ', e)
        }
    },

    async getUserWallet(id) {
        try {
            const userWallet =  await strapi.db.query('api::wallet.wallet').findOne({
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

     async getParentId(wallet) {
        try {
            const parent = await strapi.db.query('api::wallet.wallet').findOne({
                where: {wallet_id: wallet.parent_wallet_id},
            })
            return parent.id;
        } catch(e) {
            console.log('error: ', wallet.id)
        }
    },

    async get_complete_child_tree(id) {
        
        try {
            const walletId = id
            const referrals = await strapi.service('api::cal-pro-com.cal-pro-com').getReferral(walletId);
      
            if (referrals) {
             
              return  await Promise.all(referrals.map(async element => {
              
              if (element.level == 1)             
                  return {
                            name:element.child_wallet.wallet_id, 
                            attributes :{ 
                                child: element.child_wallet.id,
                                parent: element.parent_wallet.id,
                                package: element.child_wallet.package.name,
                                level:element.level
                                },
                                children:[]                                
                         }     
              else if (element.level > 1) {
                  const parentId =  await strapi.service('api::cal-pro-com.cal-pro-com').getParentId(element.child_wallet)
                  return {
                            name:element.child_wallet.wallet_id, 
                            attributes :{ 
                                child: element.child_wallet.id,
                                parent: parentId,
                                package: element.child_wallet.package.name,
                                level:element.level
                                },
                                children:[]                                
                        }  
              }
              }));
            }              
      
          } catch (err) {
            console.log(err)
          }          
    },

    getTimeDifference(endDate, startDate) {
        const msInMinutes = 60 * 1000;
        return Math.round(
            Math.abs(endDate - startDate) / msInMinutes
        );
    },

});
