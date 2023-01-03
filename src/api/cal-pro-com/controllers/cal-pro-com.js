'use strict';

/**
 * A set of functions called "actions" for `cal-pro-com`
 */

const ethers = require('ethers');
const e = require('express');
const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/7GgqThz-Pqbk5xcWy5wTHi6WGzZFPBou");
const ContractInterface = '[{"inputs":[{"internalType":"contract TripleEight","name":"_mytoken","type":"address"},{"internalType":"uint256","name":"_tokenPerSecond","type":"uint256"},{"internalType":"address","name":"_feeCollector","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"EmissionRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"commissionAmount","type":"uint256"}],"name":"ReferralCommissionPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLockedUp","type":"uint256"}],"name":"RewardLockedUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAXIMUM_HARVEST_INTERVAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"T8ReferralContract","outputs":[{"internalType":"contract T8Referral","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"canHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_packageId","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"myToken","outputs":[{"internalType":"contract TripleEight","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolFee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"harvestInterval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_harvestInterval","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract T8Referral","name":"_T8Referral","type":"address"}],"name":"setT8Referral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"contract IERC20","name":"lpToken","type":"address"}],"name":"swapExactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapRouter","outputs":[{"internalType":"contract ISwapRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLockedUpRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenPerSecond","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"rewardLockedUp","type":"uint256"},{"internalType":"uint256","name":"nextHarvestUntil","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const STAKING_SMART_CONTRACT = '0xf1bcBbe87f3866807A12aa7a93cdE47eB6020FD8';

module.exports = {

  calculate: async (ctx, next) => {
    try {
      const harvesterId = ctx.request.query.id;
      const haresterWallet = await strapi.service('api::cal-pro-com.cal-pro-com').getUserWallet(harvesterId);
      const hWalletAddress = haresterWallet.wallet_address;
      const contract = new ethers.Contract(STAKING_SMART_CONTRACT, ContractInterface, provider);
      const reward = await contract.pendingToken(1, hWalletAddress);

      let profit = parseFloat(ethers.utils.formatUnits(reward, '8'));
      let commission = null;

      const referral = await strapi.service('api::cal-pro-com.cal-pro-com').getReferral(harvesterId);

      if (referral) {
        commission = await Promise.all(referral.map(async item => {
          try {
            const childReward = await contract.pendingToken(1, item.child_wallet.wallet_address);
            const childProfit = parseFloat(ethers.utils.formatUnits(childReward, '8'));
            let commission_income;
            let commission_percentage = 0;
            switch (item.level) {
              case 1:
                commission_percentage = item.parent_wallet.package.commission_level1;
                commission_income = parseFloat(item.parent_wallet.package.commission_level1 * childProfit / 100);
                break;
              case 2:
                commission_percentage = item.parent_wallet.package.commission_level2;
                commission_income = parseFloat(item.parent_wallet.package.commission_level2 * childProfit / 100);
                break;
              case 3:
                commission_percentage = item.parent_wallet.package.commission_level3;
                commission_income = parseFloat(item.parent_wallet.package.commission_level3 * childProfit / 100);
                break;
              case 4:
                commission_percentage = item.parent_wallet.package.commission_level4;
                commission_income = parseFloat(item.parent_wallet.package.commission_level4 * childProfit / 100);
                break;
              default:
                commission_income = 0;
            }
            return {
              "this_farmer": item.parent_wallet.wallet_id,
              "package": item.child_wallet.package.name,
              "package_value": item.child_wallet.package.value,
              "profit": 0,
              "commission": commission_income,
              "commission_percentage": commission_percentage,
              "from_farmer": item.child_wallet.wallet_id,
              "level": item.level,
            }
          } catch (e) {
            return {}
          }
        }))
      }

      const result = [
        {
          "this_farmer": haresterWallet.wallet_id,
          "package": haresterWallet.package.name,
          "package_value": haresterWallet.package.value,
          "profit": profit,
          "commission": 0,
          "from_farmer": haresterWallet.wallet_id,
          "level": 0,
        },
        ...commission
      ];
      ctx.send(result);
    } catch (err) {
      ctx.body = err;
    }
  },

  getWalletTree: async (ctx, next) => {

      const id = ctx.request.query.id;
      let complete_child_array = await strapi.service('api::cal-pro-com.cal-pro-com').get_complete_child_array(id);

      let root_wallet = await strapi.service('api::cal-pro-com.cal-pro-com').getUserWallet(id);
      root_wallet = {
                      name:root_wallet.wallet_id, 
                      attributes :{ 
                          child: id,
                          parent: null,
                          package: root_wallet.package? root_wallet.package.name : "",
                          level:0
                          },
                          children:[]                                
                  }  

      complete_child_array = [root_wallet, ...complete_child_array]

      const idMapping = complete_child_array.reduce((acc, el, i) => {
        acc[el.attributes.child] = i;
        return acc;
      }, {});

      let root;

      try {
        complete_child_array.forEach(el => {
            if (el.attributes.parent === null) {
              root = el;
            }
            const parentEl = complete_child_array[idMapping[el.attributes.parent]];
            if (parentEl)          
              parentEl.children = [...(parentEl.children || []), el];
        });
      } catch(err) {
        console.log(err)
      }     
    return root
  }
};
