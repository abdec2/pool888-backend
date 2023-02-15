module.exports = {
    
    async afterCreate(event) {

      const { result, params } = event;
      console.log(result.id)

     let transactions = await strapi.entityService.findMany(
        "api::transaction.transaction", { filters: { id : result.id}, 
        populate: {users_permissions_user: true, 
                   wallet: {populate: {package:true,users_permissions_user:true, pool:true}}, 
                   referral: {populate:{parent_wallet:true, child_wallet:true}},
                   parent_wallet: {populate: {package:true,users_permissions_user:true}}
        }});

        const transaction = transactions[0]

      try{
               
            if (transaction.type === 'package') {
              
                const ntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">Congratulations ${transaction.wallet.users_permissions_user.username}</h6> You just acquired ${transaction.wallet.package.name} package with your <br> wallet id : ${transaction.wallet.wallet_id} <br> wallet address : ${transaction.wallet.wallet_address} </div>`

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transaction.users_permissions_user,
                        transaction: transaction.id,
                        status: 'current'
                    }
                })            

            } else if (transaction.type === 'commission') {
           
                const ntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">Congratulations  ${transaction.wallet.users_permissions_user.username}!</h6> You received ${transaction.amount} 888 tokens from your level ${transaction.referral.level} referral: ${transaction.referral.child_wallet.wallet_id} </div>`

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transaction.users_permissions_user,
                        transaction: transaction.id,
                        status: 'current'
                    }
                })         

            } else if (transaction.type === 'harvest') {

                const ntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">Congratulations ${transaction.wallet.users_permissions_user.username}!</h6> You harvested ${transaction.amount} 888 tokens of your earnings. </div>`

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transaction.users_permissions_user,
                        transaction: transaction.id,
                        status: 'current'
                    }
                })              

            } else if (transaction.type === 'withdrawal') {

            
                const ntext = `<div style="padding:1rem;">You withdrew ${transaction.amount} ${transaction.wallet.pool.currency} from your wallet id: ${transaction.wallet.wallet_id}</div>`

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transaction.users_permissions_user,
                        transaction: transaction.id,
                        status: 'current'
                    }
                })
               
            } else if (transaction.type === 'gratitude') {

                const ntext = `<div style="padding:1rem;"><h6 style="color:#FFC23C;">Congratulations ${transaction.wallet.users_permissions_user.username}!</h6> You received  gratitude reward from your parent wallet id: ${transaction.parent_wallet.wallet_id}</div>`

                strapi.entityService.create('api::notification.notification', {
                    data: {
                        text: ntext ,
                        type: 'transaction',
                        users_permissions_user: transaction.users_permissions_user,
                        transaction: transaction.id,
                        status: 'current'
                    }
                })                
            } 

    } catch(e) {
        console.log(e);
    }
  },
  }