'use strict';

/**
 * A set of functions called "actions" for `cal-pro-com`
 */

module.exports = {
  calculate: async (ctx, next) => {
    try {
      const harvesterId = ctx.request.query.id;
      const apy = ctx.request.query.apy;
      const haresterWallet = await strapi.service('api::cal-pro-com.cal-pro-com').getUserWallet(harvesterId);
      let profit=0;
      let commission = null;
      let lastHarvestTime = 0;
      let harvestTimeInMinutes = 0;
      if (haresterWallet.package) {
        lastHarvestTime = haresterWallet.last_harvest_time;
        console.log(lastHarvestTime)
        harvestTimeInMinutes = strapi.service('api::cal-pro-com.cal-pro-com').getTimeDifference(new Date(), new Date(lastHarvestTime))
        profit = parseFloat((haresterWallet.balance * harvestTimeInMinutes * apy) / (365 * 24 * 60)).toFixed(2);
      }
      const referral = await strapi.service('api::cal-pro-com.cal-pro-com').getReferral(harvesterId);
      if (referral) {
          commission = referral.map(item => {
          const childLHT = item.child_wallet.last_harvest_time;
          const childHTIM = strapi.service('api::cal-pro-com.cal-pro-com').getTimeDifference(new Date(), new Date(childLHT));
          const childProfit = parseFloat((item.child_wallet.balance * childHTIM * apy) / (365 * 24 * 60)).toFixed(2);
          let commission_income;
          let commission_percentage = 0;
          switch (item.level) {
            case 1:
              commission_percentage = item.parent_wallet.package.commission_level1;
              commission_income = parseFloat(item.parent_wallet.package.commission_level1 * childProfit / 100).toFixed(2);
              break;
            case 2:
              commission_percentage = item.parent_wallet.package.commission_level2;
              commission_income = parseFloat(item.parent_wallet.package.commission_level2 * childProfit / 100).toFixed(2);
              break;
            case 3:
              commission_percentage = item.parent_wallet.package.commission_level3;
              commission_income = parseFloat(item.parent_wallet.package.commission_level3 * childProfit / 100).toFixed(2);
              break;
            case 4:
              commission_percentage = item.parent_wallet.package.commission_level4;
              commission_income = parseFloat(item.parent_wallet.package.commission_level4 * childProfit / 100).toFixed(2);
              break;
            default:
              commission_income = 0;
          }
          return {
            "this_farmer": item.parent_wallet.wallet_id,
            "package": item.child_wallet.package.name,
            "package_value": item.child_wallet.package.value,
            "profit": 0,
            "commission": (commission_income / 47000).toFixed(2),
            "commission_percentage": commission_percentage,
            "from_farmer": item.child_wallet.wallet_id,
            "level": item.level,
            "harvestMinutes": harvestTimeInMinutes,
            "apy": apy,
            "last_harvest_time": lastHarvestTime
          }
        })
      }
      
      const result = [
        {
          "this_farmer": haresterWallet.wallet_id,
          "package": haresterWallet.package.name,
          "package_value": haresterWallet.package.value,
          "profit": (profit / 47000).toFixed(2) ,
          "commission": 0,
          "from_farmer": haresterWallet.wallet_id,
          "level": 0,
          "harvestMinutes": harvestTimeInMinutes,
          "apy": apy,
          "last_harvest_time": lastHarvestTime
        },
        ...commission
      ];
      ctx.send(result);
    } catch (err) {
      ctx.body = err;
    }
  }
};
