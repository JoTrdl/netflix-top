'use strict';

const controller = require('./controller');

exports.register = function(server, options, next) {

  server.log(['info', 'registration', 'module'], 'Registering [App] Module');

  server.route({
    method: 'GET',
    path: '/',
    config: controller.config,
    handler: controller.handler
  });

  server.route({
    method: 'GET',
    path: '/top/{category}',
    config: controller.config,
    handler: controller.handler
  });

  server.route({
    method: 'GET',
    path: '/{param}',
    handler: {
      directory: {
        path: ['.', 'build'],
        redirectToSlash: true
      }
    }
  });
  
  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
