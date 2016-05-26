'use strict';

const Joi = require('joi'),
      config = require(`${ROOT}/config`);

exports.config = {
  cache: {
    expiresIn: config.caching.tll
  },
  validate: {
    params: {
      id: Joi.number().required()
    }
  }
};

exports.handler = {
  proxy: {
    mapUri: (request, callback) => {
      callback(null, `http://cdn.nflximg.com/us/boxshots/ghd/${request.params.id}.jpg`)
    },
    onResponse: (err, res, request, reply, settings, ttl) => {
      if (res.statusCode !== 200) {
        // TODO: reply a custom image
      }
      reply(res);
    }
  }
};