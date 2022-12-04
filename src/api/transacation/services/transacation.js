'use strict';

/**
 * transacation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::transacation.transacation');
