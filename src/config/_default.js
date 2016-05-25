
const Path = require('path');

module.exports = {
  env: 'default',

  connections: {
    server: {
      labels: ['server'],
      port: process.env.PORT || 80,
      host: process.env.HOST || process.env.HOSTNAME,
      routes: {
        cors: {
          origin: ['*'],
          credentials: true
        },
        files: {
          relativeTo: Path.join(__dirname, '/../www/assets/build')
        }
      }
    }
  },

  caching: {
    ttl: 60 * 60 * 1000 // 1 hour
  },

  logging: { log: '*', response: '*' }
};
