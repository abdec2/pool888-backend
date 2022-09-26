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
        path: '/wallet/getAllParents',
        handler: 'wallet.getAllParents',
        config: {
          policies: [],
          middlewares: [],
        },
       },
       
    ]
}