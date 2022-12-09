

module.exports = {

    async afterFindMany(event) {

        const { result, params } = event;
        const notifications = result ;

        notifications.forEach(async element => {
            const entry = await strapi.entityService.update('api::notification.notification', element.id, {
                data: {
                  status: 'archived',
                },
              });
        })
    }
}