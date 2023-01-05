module.exports = {
    
    async afterCreate(event) {

      const { result, params } = event;
      console.log(result.id)

     let transactions = await strapi.entityService.findMany(
        "api::transaction.transaction", { filters: { id : result.id}, 
        populate: {users_permissions_user: true, 
                   wallet: {populate: {package:true,users_permissions_user:true}}, 
                   referral: {populate:{parent_wallet:true, child_wallet:true}}
        }});
   
      try{
               
            if (transactions[0].type === 'package') {
                const ntext =  `Congratulations `+ transactions[0].wallet.users_permissions_user.username +  `!. You acquired `+ transactions[0].wallet.package.name +
                ` package with your wallet id : ` + transactions[0].wallet.wallet_id  + ` wallet address : ` + transactions[0].wallet.wallet_address    

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transactions[0].users_permissions_user,
                        transaction: transactions[0].id,
                        status: 'current'
                    }
                })
            } else if (transactions[0].type === 'commission') {
                const ntext =  `Congratulations `+ transactions[0].wallet.users_permissions_user.username +  `!. You received `+ transactions[0].amount +
                ` 888 tokens from your level ` + transactions[0].referral.level + ` referral: ` +  transactions[0].referral.child_wallet.wallet_id 

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transactions[0].users_permissions_user,
                        transaction: transactions[0].id,
                        status: 'current'
                    }
                })
            } else if (transactions[0].type === 'harvest') {

                const ntext =  ` You harvested `+ transactions[0].amount +
                ` 888 tokens from your earnings` 

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transactions[0].users_permissions_user,
                        transaction: transactions[0].id,
                        status: 'current'
                    }
                })
            } else if (transactions[0].type === 'withdrawal') {

                const ntext =  ` You withdrew `+ transactions[0].amount +
                ` USDT from your wallet id: ` + transactions[0].wallet.wallet_id 

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transactions[0].users_permissions_user,
                        transaction: transactions[0].id,
                        status: 'current'
                    }
                })
            } 

    } catch(e) {
        console.log(e);
    }
  },
  }