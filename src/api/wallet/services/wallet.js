'use strict';

/**
 * wallet service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wallet.wallet', ({ strapi }) =>  ({

    async sendPackageEmail(wid) {

        let wallets = await strapi.entityService.findMany(
            "api::wallet.wallet", { filters: { id : wid}, 
            populate: {users_permissions_user: true, package: true}}
        );

        let wallet = wallets[0]
        
         strapi
        .plugin('email')
        .service('email')
        .send({
            to: wallet.users_permissions_user.email,
            from: process.env.SMTP_USERNAME,
            subject:  wallet.package.name  + ` Package`, 
            html: `<div>
            <h4> Congratulations `+ wallet.users_permissions_user.username +  `!. You just acquired `+ wallet.package.name +
            ` package with your <br> wallet id:` + wallet.wallet_id  + ` wallet address : ` + wallet.wallet_address + `. <br> 60 % of which will go to level 1 staking contract and 40% buys 888 governance tokens. <h4> </div>`    
    
        }).then((res) => {
            console.log("Email Success")
        })
        .catch((err) => {
            console.log(err)
        })  
    }


}));