'use strict';

const controller = require('./controller');

exports.register = function(server, options, next) {

  server.log(['info', 'registration', 'module'], 'Registering [Netflix] Module');

  server.route({
    method: 'GET',
    path: '/feed/{category}',
    config: controller.config,
    handler: controller.handler
  });

  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
