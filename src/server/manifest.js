
'use strict';

const config = require(`${ROOT}/config`);

module.exports = {

  server: {
    app: config,
    cache: config.connections.cache
  },

  /**
   * Server connections
   * @type {Array}
   */
  connections: [
    config.connections.server
  ],

  /**
   * Server registrations
   * @type {Array}
   */
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          opsInterval: 1000,
          reporters: [{ reporter: require('good-console'), events: config.logging }]
        }
      }
    },
    { plugin: { register: 'inert'} },
    { plugin: { register: 'vision'} },
    { plugin: { register: 'lout'} },
    { plugin: { register: 'h2o2'} },
    { plugin: { register: 'hapi-boom-decorators'} },
    { plugin: { register: './plugins/sanitizer'} },
    { plugin: { register: './plugins/error'} },
    { plugin: { register: './modules'} }
  ]
};
