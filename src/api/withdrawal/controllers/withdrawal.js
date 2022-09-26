'use strict';

/**
 * withdrawal controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::withdrawal.withdrawal');
