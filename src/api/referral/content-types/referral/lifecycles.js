module.exports = {
    
    async afterCreate(event) {

      const { result, params } = event;
      console.log(result.id)

      let referral = await strapi.service('api::cal-pro-com.cal-pro-com').getReferralById(result.id)
          
      strapi.service('api::referral-add.referral-add').sendEmailToReferrer(referral.parent_wallet, referral.child_wallet, referral.level);

      const percentage = await strapi.service('api::referral-add.referral-add').getPercentageOfReferral(referral.parent_wallet,referral.level)

    //   const ntext = `Congratulations ` +  referral.parent_wallet.users_permissions_user.username + `! `+ referral.child_wallet.wallet_id + `! has joined your network as your level `+ referral.level +
    //   ` referral.` + ` You will earn ` + percentage + ` percent of their profit. ` 
      
      const ntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">Congratulations ${referral.parent_wallet.users_permissions_user.username}!</h6> ${referral.child_wallet.wallet_id}! has joined your network as your level ${referral.level} referral. You will earn ${percentage} percent of their profit. </div>`
      try{
        const notification = await strapi.entityService.create('api::notification.notification', {
            data: {
                referral: referral.id,
                text: ntext ,
                type: 'walletconnect',
                users_permissions_user: referral.parent_wallet.users_permissions_user,
                status: 'current'
            }
        })

    } catch(e) {
        console.log(e);
    }


    },
  }