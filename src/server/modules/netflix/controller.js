'use strict';

const Joi = require('joi'),
      config = require('../../../config'),
      service = require('../../../services/netflix.service');

exports.config = {
  cache: {
    expiresIn: config.caching.tll
  },
  validate: {
    params: {
      category: Joi.string().required()
    }
  },
  plugins: {
    sanitizer: {
      params: {
        category: 'escape'
      }
    }
  },
};

exports.handler = function(request, reply) {
  service
    .fetch(request.params.category)
    .then(data => {
      if (!data) return reply.notFound();
      reply(data)
    })
    .catch(e => reply.badImplementation(e));
};