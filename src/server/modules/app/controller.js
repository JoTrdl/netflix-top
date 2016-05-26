'use strict';

const Promise = require('bluebird'),
      Glob = Promise.promisify(require('glob')),
      riot = require('riot');

const config = require(`${ROOT}/config`),
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

  service
    .fetch(category)
    .then(data => {
      if (!data) {
        store.dispatch({type: 'FETCH_ERROR', data: null});
      } else {
        store.dispatch({type: 'FETCH_SUCCESS', data: data});
        store.dispatch({type: 'UPDATE_CATEGORY', data: category});
        store.dispatch({type: 'SERVER_RENDERED'});
      }

      reply.view('index', {
        config: config,
        manifest: manifest,
        app: riot.render('app', {store: store}),
        store: JSON.stringify(store.getState())
      });
    })
    .catch(e => reply.badImplementation(e));
};