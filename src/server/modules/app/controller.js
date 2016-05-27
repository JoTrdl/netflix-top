'use strict';

const Promise = require('bluebird'),
      Glob = Promise.promisify(require('glob')),
      riot = require('riot');

const config = require(`${ROOT}/config`),
      baseURL = `http://${config.connections.server.host}:${config.connections.server.port}`,
      store = require(`${ROOT}/store`),
      service = require(`${ROOT}/services/netflix.service`);

const manifest = require(`${ROOT}/www/manifest.json`);

// Load all tags
new Glob(`${ROOT}/www/**/*.tag`, {cwd: __dirname}).then((tags) => {
  tags.forEach((tag) => require(tag));
});

exports.config = {
  
};

exports.handler = function(request, reply) {

  const category = request.params.category || '100';

  store.dispatch(
    store.actions.updateCategory(category, baseURL)
  ).then(() => {
    reply.view('index', {
      config: config,
      manifest: manifest,
      app: riot.render('app', {store: store}),
      store: JSON.stringify(store.getState())
    });
  });
};