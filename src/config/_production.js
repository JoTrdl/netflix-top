
module.exports = {
  env: 'production',

  connections: {
    server: {
      host: process.env.HOST || process.env.HOSTNAME
    }
  }
};
