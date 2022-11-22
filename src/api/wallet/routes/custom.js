module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/wallet/walletExist',
       handler: 'wallet.walletExist',
       config: {
         policies: [],
         middlewares: [],
       },
      },

      {
        method: 'GET',
        path: '/wallet/userHasWallet',
        handler: 'wallet.userHasWallet',
        config: {
          policies: [],
          middlewares: [],
        },
       }
       
    ]
}