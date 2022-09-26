'use strict';

/**
 * harvest service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::harvest.harvest');
