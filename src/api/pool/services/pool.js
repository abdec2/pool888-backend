'use strict';

/**
 * pool service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pool.pool');
