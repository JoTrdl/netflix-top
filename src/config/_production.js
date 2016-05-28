console.log('production', process.env.HOST || process.env.HOSTNAME, require('os').hostname() )
module.exports = {
  env: 'production',

  connections: {
    server: {
      host: require('os').hostname()
    }
  }
};
