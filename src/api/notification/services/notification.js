'use strict';

const transaction = require('../../transaction/controllers/transaction');

/**
 * wallet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notification.notification', ({ strapi }) =>  ({

    async getChinesePackageName(package_name) {

        const package_cnames= {
            "Platinum" : "白金配套",
            "Gold" : "金子",
            "Silver": "银",
            "Bronze": "青铜",
            "Freedom": "自由"
        }
        return package_cnames[package_name]
    },

    async getChineseNotificationText(notification){        
 
        let cntext = null

        const package_cnames= {
            "Platinum" : "白金配套",
            "Gold" : "金子",
            "Silver": "银",
            "Bronze": "青铜",
            "Freedom": "自由"
          }
        const referral = notification.referral
        const type  = notification.type
        const transaction = notification.transaction

       if ( type === "walletconnect" && referral !== null ){

            const percentage = await strapi.service('api::referral-add.referral-add').getPercentageOfReferral(referral.parent_wallet, referral.level)            
            cntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">Congratulations ${notification.users_permissions_user.username}!</h6> ${referral.child_wallet.wallet_id} 已作为您的 ${referral.level} 级推荐人加入您的网络。 您将赚取他们利润的 ${percentage}%</div>`

        } else if (type === "transaction"){
        
            if (transaction.type === 'package') {
                const package_cname = await strapi.service('api::notification.notification').getChinesePackageName(transaction.wallet.package.name);

                cntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">恭喜 ${transaction.wallet.users_permissions_user.username}</h6> 您刚刚使用您的设备获得了 ${package_cname}  配套 <br> 钱包编号：${transaction.wallet.wallet_id} <br> 钱包地址：${transaction.wallet.wallet_address} </div>`
            
            } else if (transaction.type === 'commission') {  
                
                cntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">恭喜  ${transaction.wallet.users_permissions_user.username}!</h6> 您从 ${transaction.referral.level} 级推荐人:${transaction.referral.child_wallet.wallet_id} 那里收到了 ${transaction.amount} 888 代币 </div>`
            
            } else if (transaction.type === 'harvest') {

                cntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">恭喜  ${transaction.wallet.users_permissions_user.username}!</h6> 您收获了 ${transaction.amount} 888 代币的收入`

            } else if (transaction.type === 'withdrawal') {

                cntext = `<div style="padding:1rem;">您从钱包 ID 中提取了 ${transaction.amount}: ${transaction.wallet.wallet_id}</div>`

            } else if (transaction.type === 'gratitude') {

                cntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">恭喜  ${transaction.wallet.users_permissions_user.username}!</h6> 您收到了来自您上线推荐钱包id：${transaction.parent_wallet.wallet_id} 的感谢奖励`

            } 
        }

        return cntext

    },  

}))