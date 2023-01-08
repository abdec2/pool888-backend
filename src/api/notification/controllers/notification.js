'use strict';

/**
 * notification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async findByUser(ctx) {      

            try {
                const notifications = await strapi.entityService.findMany('api::notification.notification', {
                    filters: {users_permissions_user: ctx.request.query.userid },
                    sort: {createdAt: 'desc'}
                 }) 
                return notifications;
    
            } catch(e) {
                console.log(e)
            }
    },

    async getCurNotifications(ctx) {
        
        try {
            const notifications = await strapi.entityService.findMany('api::notification.notification', {
                filters: {users_permissions_user: ctx.request.query.userid , status: 'current'},
                sort: {createdAt: 'desc'}
             }) 
            return notifications;
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