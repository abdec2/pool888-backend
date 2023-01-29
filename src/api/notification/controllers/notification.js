'use strict';

const transaction = require('../../transaction/controllers/transaction');

/**
 * notification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async findByUser(ctx) {      

        const lang = ctx.request.query.lang

        try {
            const notifications = await strapi.entityService.findMany('api::notification.notification', {
                filters: {users_permissions_user: ctx.request.query.userid },
                sort: {createdAt: 'desc'},
                populate: { users_permissions_user:true, 
                    transaction :{ populate: {users_permissions_user: true, 
                    wallet: {populate: {package:true,users_permissions_user:true, pool:true}}, 
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
                        parent_wallet: {populate: {package:true,users_permissions_user:true}}}},
                      referral: {
                        populate: {
                          parent_wallet: { populate: {
                           package: true, users_permissions_user:true, pool:true
                          }
                        },                       
                          child_wallet: { populate: {
                             package: true, users_permissions_user:true, pool:true
                            }
                          }
                        }
                      },  
                 }}) 
                         
        if ( lang === "en"){

            const english_notifications = await Promise.all(notifications.map(async notification => {
                return {
                    "text" : notification.text,
                    "createdAt" : notification.createdAt,
                    "type": notification.transaction? notification.transaction.type: "walletconnect"
                  }                
            }))
            return english_notifications

        } else if (lang === "cn") {

            const chinese_notifications = await Promise.all(notifications.map(async notification => {
            
            let cnText = await strapi.service('api::notification.notification').getChineseNotificationText(notification);

        
            return {
                "text" : cnText,
                "createdAt" : notification.createdAt,
                "type": notification.transaction? notification.transaction.type: "walletconnect"
                }    
                
            }))
            return chinese_notifications
        }                

    } catch(e) {
        console.log(e)
    }
    },

    async getCurNotifications(ctx) {     
      
      const lang = ctx.request.query.lang

        try {
            const notifications = await strapi.entityService.findMany('api::notification.notification', {
                filters: {users_permissions_user: ctx.request.query.userid , status: 'current'},
                sort: {createdAt: 'desc'},
                populate: { users_permissions_user:true, 
                    transaction :{ populate: {users_permissions_user: true, 
                    wallet: {populate: {package:true,users_permissions_user:true, pool:true}}, 
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
                      parent_wallet: {populate: {package:true,users_permissions_user:true}}}},
                      referral: {
                        populate: {
                          parent_wallet: { populate: {
                           package: true, users_permissions_user:true, pool:true
                          }
                        },                       
                          child_wallet: { populate: {
                             package: true, users_permissions_user:true, pool:true
                            }
                          }
                        }
                      },  
                 }}) 

                         
        if ( lang === "en"){

            const english_notifications = await Promise.all(notifications.map(async notification => {
                return {
                    "text" : notification.text,
                    "createdAt" : notification.createdAt,
                    "type": notification.transaction? notification.transaction.type: "walletconnect"
                  }                
            }))
            return english_notifications

        } else if (lang === "cn") {

            const chinese_notifications = await Promise.all(notifications.map(async notification => {
            
             let cnText = await strapi.service('api::notification.notification').getChineseNotificationText(notification);

        
            return {
                "text" : cnText,
                "createdAt" : notification.createdAt,
                "type": notification.transaction? notification.transaction.type: "walletconnect"
                }    
                
            }))
            return chinese_notifications
        }         
        } catch(e) {
            console.log(e)
        }    
    } ,   

    async setCurToArchived(ctx) {
        
        try {
            const notifications = await strapi.entityService.findMany('api::notification.notification', {
                filters: {users_permissions_user: ctx.request.query.userid , status: 'current'},
             }) 
            
             notifications.forEach(notification  => {
                strapi.entityService.update('api::notification.notification', notification.id, {
                    data: {
                      status: 'archived',
                    },
                  });
             })     
             return true     
        } catch(e) {
            console.log(e)
            return false
        }

    }
}))