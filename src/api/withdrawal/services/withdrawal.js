'use strict';

/**
 * withdrawal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::withdrawal.withdrawal');
