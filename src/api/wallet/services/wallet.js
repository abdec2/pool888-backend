
/**
 * wallet'use strict';
 service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wallet.wallet', ({ strapi }) =>  ({

    async sendPackageEmail(wid) {

        let wallets = await strapi.entityService.findMany(
            "api::wallet.wallet", { filters: { id : wid}, 
            populate: {users_permissions_user: true, package: true, pool:true}}
        );

        let wallet = wallets[0]

        let bodyMLMPackage = `<div>
        <h4> Congratulations `+ wallet.users_permissions_user.username +  `!</h4> You just acquired `+ wallet.package.name +
        ` package with your <br> wallet id: ` + wallet.wallet_id  + `<br> wallet address : ` + wallet.wallet_address + 
        `<br> value: ` + wallet.package.value + wallet.pool.currency+
        `. <br> 60 % of which will go to level 1 staking contract and 40% buys 888 governance tokens. </div>`    

        let bodyFreedomPackage = `<div>
        <h4> Congratulations `+ wallet.users_permissions_user.username +  `!</h4> You just acquired `+ wallet.package.name +
        ` package with your <br> wallet id: ` + wallet.wallet_id  + `<br> wallet address : ` + wallet.wallet_address + 
        `<br> value: ` + wallet.balance + ` ` + wallet.pool.currency+
        `. <br> 100 % of which will go to level 1 staking contract </div>`    

         strapi
        .plugin('email')
        .service('email')
        .send({
            to: wallet.users_permissions_user.email,
            from: process.env.SMTP_USERNAME,
            subject:  wallet.package.name  + ` Package`, 
            html: wallet.package.name === "Freedom"? bodyFreedomPackage : bodyMLMPackage
    
        }).then((res) => {
            console.log("Email Success")
        })
        .catch((err) => {
            console.log(err)
        })  
    }


}));