
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

  views: {
    engines: { jade: require('jade') },
    path: Path.join(__dirname, '/../server/views')
  },

  caching: {
    ttl: 60 * 60 * 1000 // 1 hour
  },

  logging: { log: '*', response: '*' }
};
