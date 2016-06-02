
const Path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'default',

  connections: {
    server: {
      labels: ['server'],
      port: process.env.PORT || 80,
      host: process.env.HOST || process.env.HOSTNAME || 'localhost',
      routes: {
        cors: {
          origin: ['*'],
          credentials: true
        },
        files: {
          relativeTo: Path.join(__dirname, '/../www/assets')
        }
      }
    }
  },

  views: {
    engines: { jade: require('jade') },
    path: Path.join(__dirname, '/../server/views')
  },

  caching: {
    ttl: 60 * 60 * 1000 // 1 hour
  },

  logging: { log: '*', response: '*' }
};
