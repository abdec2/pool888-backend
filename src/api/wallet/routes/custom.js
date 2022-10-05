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
      }
       
    ]
}