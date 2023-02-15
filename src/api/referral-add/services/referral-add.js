'use strict';

const { computeHmac } = require("ethers/lib/utils");

/**
 * referral-add service
 */

module.exports = () => ({

   
    async parentOf(wallet) {
        try {
            const parent = await strapi.db.query('api::wallet.wallet').findOne({
                where: {wallet_id: wallet.parent_wallet_id},
                populate: { package: true, users_permissions_user: true}
            })
            return parent;
        } catch(e) {
            console.log('error: ', wallet)
        }
    },

    async createReferral(parent, child, level) {
        try{
            const referral = await strapi.entityService.create('api::referral.referral', {
                data: {
                    parent_wallet: parent.id,
                    child_wallet: child.id,
                    level: level,
                    publishedAt: new Date().toISOString()
                }
            })
        } catch(e) {
            console.log(e);
        }
    },

    async getPercentageOfReferral(parent,level) {
        let percentage = 0
        switch (level) {
            case 1:
            percentage = parent.package.commission_level1 ;
            break;
            case 2:
                percentage = parent.package.commission_level2 ;
            break;
            case 3:
                percentage = parent.package.commission_level3 ;
            break;
            case 4:
                percentage = parent.package.commission_level4 ;
            break;
            default:
                percentage = 0;
        }
        return percentage

    },

    async sendEmailToReferrer(parent, child, level) {        
           
        const percentage = await strapi.service('api::referral-add.referral-add').getPercentageOfReferral(parent, level)        // let percentage = 0
      
        console.log(percentage)
            
           
        let  client_url  = process.env.CLIENT_URL
        await strapi
        .plugin('email')
        .service('email')
        .send({
            to: parent.users_permissions_user.email,
            from: process.env.SMTP_USERNAME,
            subject: child.wallet_id + ' joined your network',
            html: `<div>
            <h4> Congratulations `+ parent.users_permissions_user.username + ` ! </h4> <br>` +  child.wallet_id + ` has joined your network as your level `+ level +
            ` referral.<br>` + ` You will earn ` + percentage + ` percent of their profit. <br> ` + 
            `Login to see your earnings. <br>` + client_url  + `</div>`      
    
        }).then((res) => {
          console.log("Email Success")
        })
        .catch((err) => {
          console.log("Email Failed")
        })             
    },    

    async addReferrals(id)
    {
        try {
            const item = await strapi.entityService.findOne('api::wallet.wallet', id, {})
            let connected_wallet = item;
            let current_package_level = 0;
            let current_wallet = connected_wallet
      
            for (let level = 1; level <= 4; level++) {
              let parent_wallet = await strapi.service('api::referral-add.referral-add').parentOf(current_wallet);
              if (parent_wallet) {
                if (parent_wallet.package !== null && parent_wallet.package.level > current_package_level) {
                  await strapi.service('api::referral-add.referral-add').createReferral(parent_wallet, connected_wallet, level);
                  console.log(parent_wallet.wallet_id)
                }
              }
              else break;
              current_wallet = parent_wallet;
              current_package_level++;
            }
      
          } catch (err) {
            console.log(err)
          }
          return
    }
});


