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
                    sort: 'createdAt',
                 }) 
                return notifications;
    
            } catch(e) {
                console.log(e)
            }
    },
    
}))