'use strict';

/**
 * harvest controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::harvest.harvest');
