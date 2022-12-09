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
            <h4> Congratulations `+ parent.users_permissions_user.username + ` ! ` +  child.wallet_id + ` has joined your network as your level `+ level +
            ` referral.<br>` + ` You will earn ` + percentage + ` percent of their profit.</h4> <br> ` + 
            `Login to see your earnings. <br>` + client_url        
    
        }).then((res) => {
          console.log("Email Success")
        })
        .catch((err) => {
          console.log("Email Failed")
        })             
    },    
});
