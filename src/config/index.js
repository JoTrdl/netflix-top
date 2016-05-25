'use strict';

const fs = require('fs'),
       _ = require('lodash');

let config = require('./_default');
const ENV_NAME = process.env.NODE_ENV || process.env.ENV;
const ENVIRONMENT_FILE = `${__dirname}/_${ENV_NAME}.js`;

// Merge with ENV file if exits.
if (fs.existsSync(ENVIRONMENT_FILE)) {
  const env = require(ENVIRONMENT_FILE);
  config = _.mergeWith(config, env);
}

module.exports = config;
