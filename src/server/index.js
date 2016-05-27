/* $lab:coverage:off$ */
'use strict';

const Path = require('path'),
      Promise = require('bluebird'),
      Glue = require('glue'),
      _ = require('lodash');

// global
global.ROOT = Path.join(__dirname, '../');
if (!process.env.NODE_ENV)
  process.env.NODE_ENV = 'development';

const manifest = require('./manifest'),
      config = require(`${ROOT}/config`),
      options = { relativeTo: __dirname };

module.exports = Glue.compose(manifest, options).then((server) => {

  // register templating engine
  server.log(['info', 'server'], 'Initializing templates engine');
  server.views(config.views);

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

