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

      {
        method: 'GET',
        path: '/notification/setCurToArchived',
        handler: 'notification.setCurToArchived',
        config: {
          policies: [],
          middlewares: [],
        },
       },

       {
        method: 'GET',
        path: '/notification/getCurNotifications',
        handler: 'notification.getCurNotifications',
        config: {
          policies: [],
          middlewares: [],
        },
       },
    ],
  };
  