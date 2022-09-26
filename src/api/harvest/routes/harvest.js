'use strict';

/**
 * harvest router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::harvest.harvest');
