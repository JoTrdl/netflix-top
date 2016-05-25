/* $lab:coverage:off$ */
'use strict';

// global
global.ROOT = __dirname;
if (!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

const Promise = require('bluebird'),
      Glue = require('glue'),
      _ = require('lodash');

const manifest = require('./manifest');
const options = {
  relativeTo: __dirname
};

module.exports = Glue.compose(manifest, options).then((server) => {

  // register templating engine
  server.log(['info', 'server'], 'Initializing templates engine');
  server.views({
    engines: { handlebars: require('handlebars') },
    path: __dirname + '/views'
  });

  // Testing: don't start the server
  if (module.parent && process.env.NODE_ENV === 'test') {
    return server;
  }

  return Promise.resolve(server).call('start').return(server);
})
.then((server) => {
  server.log(['info', 'server'], 'Server running at:' + server.info.uri);
  return server;
})
.catch((e) => console.error(e));
/* $lab:coverage:on$ */

