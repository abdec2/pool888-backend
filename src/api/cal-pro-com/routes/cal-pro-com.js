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
  ],
};
