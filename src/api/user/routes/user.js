module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/user/userNameExist',
     handler: 'user.userNameExist',
     config: {
       policies: [],
       middlewares: [],
     },
    },

    {
      method: 'GET',
      path: '/user/userEmailExist',
      handler: 'user.userEmailExist',
      config: {
        policies: [],
        middlewares: [],
      },
     },

     {
      method: 'POST',
      path: '/user/sendReferralMail',
      handler: 'user.sendReferralMail',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'POST',
      path: '/user/signIn',
      handler: 'user.signIn',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
