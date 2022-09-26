module.exports = ({ env }) => ({
    // ...
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port:  587,
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: env('SMTP_USERNAME'),
          defaultReplyTo: env('SMTP_USERNAME'),
        },
      },
    },    // ...
  });