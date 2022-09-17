module.exports = ({ env }) => ({
    connection: {
      client: 'mysql',
      connection: {
        host: env('DATABASE_HOST', 'aholdingdb.c2f0zzntxllc.me-south-1.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'pool888'),
        user: env('DATABASE_USERNAME', 'admin'),
        password: env('DATABASE_PASSWORD', 'motionFXAsdffdsa12.'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
        },
      },
      debug: false,
    },
  });
  