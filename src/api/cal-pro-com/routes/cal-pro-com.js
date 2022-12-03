module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/cal-pro-com',
     handler: 'cal-pro-com.calculate',
     config: {
       policies: [],
       middlewares: [],
     },
    },

    {
      method: 'GET',
      path: '/cal-pro-com/getWalletTree',
      handler: 'cal-pro-com.getWalletTree',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
