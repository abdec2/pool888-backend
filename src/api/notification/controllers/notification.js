'use strict';

/**
 * notification controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::notification.notification', ({ strapi }) =>  ({
    // Method 1: Creating an entirely custom action
    async findByUser(ctx) {      

            console.log(ctx.request.query.userid)
            try {
                const notifications = await strapi.db.query('api::notification.notification').findMany({
                    where: {users_permissions_user : ctx.request.query.userid},
                    orderBy: 'createdAt'
                });
                return notifications;
    
            } catch(e) {
                console.log(e)
            }
    },
    
}))