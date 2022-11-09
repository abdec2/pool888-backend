'use strict';

/**
 * personal-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personal-info.personal-info');
