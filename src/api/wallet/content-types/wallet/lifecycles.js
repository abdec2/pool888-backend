module.exports = {
    
    async afterCreate(event) {

      const { result, params } = event;
      console.log(result.id)

      strapi.service('api::referral-add.referral-add').addReferrals(result.id)        // let percentage = 0

      strapi.service('api::wallet.wallet').sendPackageEmail(result.id)

      let wallets = await strapi.entityService.findMany(
        "api::wallet.wallet", { filters: { id : result.id}, 
        populate: {users_permissions_user: true, package: true}}
    );

      try{
        const transaction = await strapi.entityService.create('api::transaction.transaction', {
            data: {
                wallet: wallets[0].id,
                amount: wallets[0].package.value ,
                type: 'package',
                users_permissions_user: wallets[0].users_permissions_user
            }
        })

      //   const ntext =  `Congratulations `+ wallets[0].users_permissions_user.username +  `!. You just acquired `+ wallets[0].package.name +
      //   ` package with your wallet id : ` + wallets[0].wallet_id  + ` wallet address : ` + wallets[0].wallet_address    

      //   strapi.entityService.create('api::notification.notification', {
      //     data: {
      //       text: ntext ,
      //       type: 'transaction',
      //       users_permissions_user: wallets[0].users_permissions_user,
      //       transaction: transaction.id,
      //       status: 'current'
      //   }
      // })

    } catch(e) {
        console.log(e);
    }
  },
  }