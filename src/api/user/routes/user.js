module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/user/userexist',
     handler: 'user.userExist',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
