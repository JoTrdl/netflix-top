'use strict';

const Promise = require('bluebird');
const Glob = Promise.promisify(require('glob'));

exports.register = function (server, options, next) {

  server.log(['info', 'registration', 'module'], 'Registering [Modules] Module');

  new Glob(__dirname + '/*/').then((files) => {
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