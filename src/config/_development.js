
const username = process.env.USER || process.env.USERNAME || process.env.LOGNAME;

module.exports = {
  env: 'development',

  connections: {
    server: {
      port: 8080,
      host: '0.0.0.0'
    },
    webpack: {
      port: 8081,
      host: '0.0.0.0'
    }
  },

  views: {
    isCached: false,
    compileOptions: {
      pretty: true
    }
  }

};
