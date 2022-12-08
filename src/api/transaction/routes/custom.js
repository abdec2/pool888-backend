module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/transaction/findByWallet',
       handler: 'transaction.findByWallet',
       config: {
         policies: [],
         middlewares: [],
       },
      },

      {
        method: 'GET',
        path: '/transaction/findByUser',
        handler: 'transaction.findByUser',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ]
}