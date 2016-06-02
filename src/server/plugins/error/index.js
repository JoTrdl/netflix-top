'use strict';

const manifest = require(`${ROOT}/www/manifest.json`);

exports.register = function (server, options, next) {

  server.log(['info', 'registration', 'module'], 'Registering [Error] Plugin');

  server.ext('onPreResponse', (request, reply) => {
    const response = request.response;
    if (!response.isBoom) {
      return reply.continue();
    }

    switch(response.output.statusCode) {
      case 404:
        reply.view('error_404', {
          manifest: manifest
        });
        break;

      default:
        reply.view('error', {
          manifest: manifest
        });
    }
  });

  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
