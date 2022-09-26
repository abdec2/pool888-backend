'use strict';

/**
 * wallet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wallet.wallet');

module.exports = createCoreService('api::wallet.wallet', ({ strapi }) =>  ({
    // Method 1: Creating an entirely new custom service
  async getParentWallet(wId) {
      let wallet = await strapi.entityService.findMany(
          "api::wallet.wallet", { filters: { wallet_id : wId }}, {populate: "*"}
        );     
      console.log(wallet[0])
      return wallet[0]
  } 
    
    // // Method 2: Wrapping a core service (leaves core logic in place)
    // async find(...args) {  
    //   // Calling the default core controller
    //   const { results, pagination } = await super.find(...args);
  
    //   // some custom logic
    //   results.forEach(result => {
    //     result.counter = 1;
    //   });
  
    //   return { results, pagination };
    // },
  
    // // Method 3: Replacing a core service
    // async findOne(entityId, params = {}) {
    //   return strapi.entityService.findOne('api::restaurant.restaurant', entityId, this.getFetchParams(params));
    // }
  }));