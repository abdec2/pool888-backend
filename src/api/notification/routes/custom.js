module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/notification/findByUser',
       handler: 'notification.findByUser',
       config: {
         policies: [],
         middlewares: [],
       },
      },
    ],
  };
  