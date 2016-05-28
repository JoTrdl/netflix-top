module.exports = {
  env: 'production',

  connections: {
    server: {
      host: require('os').hostname()
    }
  }
};
