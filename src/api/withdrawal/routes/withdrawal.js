'use strict';

/**
 * withdrawal router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::withdrawal.withdrawal');
