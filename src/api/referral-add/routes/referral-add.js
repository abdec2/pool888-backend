module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/referral-add',
     handler: 'referral-add.addref',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
