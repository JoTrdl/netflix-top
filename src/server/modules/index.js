'use strict';

const Promise = require('bluebird'),
      Glob = Promise.promisify(require('glob')),
      Path = require('path');

exports.register = function (server, options, next) {

  server.log(['info', 'registration', 'module'], 'Registering [Modules] Module');

  new Glob(__dirname + '/*/').then((files) => {

    // Sort modules based on 'order' property from package.json
    files.sort((a, b) => {
      let o1 = require(Path.join(a, '/package.json')).order || 0;
      let o2 = require(Path.join(b, '/package.json')).order || 0;
      return (o1 <= o2) ? -1 : 1;
    });

    return Promise.each(files, (file) => {
      return new Promise((resolve) => {
        const module = require(file);

        if (module.hasOwnProperty('register') && typeof(module.register) === 'function') {
          module.register(server, options, resolve);
        }
      });
    });
  }).then(() => next());
};

exports.register.attributes = {
  pkg: require('./package.json')
};