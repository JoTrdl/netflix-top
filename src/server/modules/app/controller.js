'use strict';

const Promise = require('bluebird'),
      Glob = Promise.promisify(require('glob')),
      riot = require('riot');

const store = require('../../../store'),
      service = require('../../../services/netflix.service');

const manifest = require('./../../../www/manifest.json');

// Load all tags
new Glob('./../../../www/**/*.tag', {cwd: __dirname}).then((tags) => {
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
        env: process.env.NODE_ENV,
        manifest: manifest,
        app: riot.render('app', {store: store}),
        store: JSON.stringify(store.getState())
      });
    })
    .catch(e => reply.badImplementation(e));
};