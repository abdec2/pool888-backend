'use strict';

/**
 * pool controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pool.pool');
