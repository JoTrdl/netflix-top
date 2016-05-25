
'use strict';

const _ = require('lodash'),
      indicative = require('indicative');

exports.register = function (server, options, next) {

  server.log(['info', 'registration', 'module'], 'Registering [Sanitizer] Plugin');

  server.ext('onPreHandler', (request, reply) => {
    const options = request.route.settings.plugins.sanitizer;
    if (!options) {
      return reply.continue();
    }

    for (let section of ['params', 'headers', 'query', 'payload']) {
      if (options[section]) {
        request[section] = _.merge(request[section], indicative.sanitize(request[section], options[section]));
      }
    }
    reply.continue();
  });

  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
