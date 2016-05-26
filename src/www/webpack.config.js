
const webpack = require('webpack'),
      ora = require('ora'),
      fs = require('fs'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ProvidePlugin = require('webpack/lib/ProvidePlugin'),
      DefinePlugin = require('webpack/lib/DefinePlugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      OfflinePlugin = require('offline-plugin'),
      autoprefixer = require('autoprefixer');

const ROOT = process.env.PWD; // from npm command
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const CSS_MAPS = (ENV !== 'production');
const BUILD_DIR = 'src/www/assets/build';

const manifest = require('./manifest.json');

/**
 * Default plugins applied both in dev/prod
 */
const BASE_PLUGINS = [
  {
    apply: function(compiler) {
      compiler.plugin('emit', (compilation, callback) => {
        manifest.hash = compilation.hash;
        fs.writeFile(`${__dirname}/manifest.json`, JSON.stringify(manifest, null, 2), callback);
      });
    }
  },
  new ExtractTextPlugin((ENV === 'production') ? 'bundle.[hash].css' : 'bundle.css'),
  new DefinePlugin({
    'ENV': JSON.stringify(ENV),
    'process.env.NODE_ENV': JSON.stringify(ENV)
  }),
  new ProvidePlugin({
    riot: 'riot'
  })
];

/**
 * Additional plugins for production
 */
const PRODUCTION_PLUGINS = [
  {
    apply: function(compiler) {
      const spinner = ora('Building for production...');
      compiler.plugin('compilation', () => spinner.start());
      compiler.plugin('done', () => spinner.stop());
    }
  },
  new CleanWebpackPlugin([BUILD_DIR], {
    root: ROOT,
    verbose: true
  }),
  new OfflinePlugin({
    caches: {
      main: ['bundle.*.js', 'bundle.*.css']
    },
    publicPath: '/',
    relativePaths: false
  }),
  new CopyWebpackPlugin([{ from: 'manifest.json' }]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: { warnings: false },
    output: { comments: false }
  })
];

/**
 * The Webpack config
 */
module.exports = {
  context: `${__dirname}`,
  entry: './index.js',

  output: {
    path: `${ROOT}/${BUILD_DIR}`,
    publicPath: '/',
    filename: (ENV === 'production') ? 'bundle.[hash].js' : 'bundle.js',
    chunkFilename: (ENV === 'production') ? '[name].[chunkhash].chunk.js' : '[name].chunk.js'
  },

  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    alias: {
      services: `${ROOT}/src/services`,
      store: `${ROOT}/src/store`,
      tags: `${__dirname}/tags`,
      style: `${__dirname}/style`
    }
  },

  module: {
    preLoaders: [
      { test: /\.tag$/, loader: 'tag-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js|\.tag$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] }},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('style-loader', [`css-loader?sourceMap=${CSS_MAPS}`, `sass-loader?sourceMap=${CSS_MAPS}`, 'postcss-loader'])},
      { test: /\.(ttf|eot|svg|woff(2)?).*$/, loader: 'file-loader' },
      { test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i, loader: 'url-loader?limit=1000' }
    ]
  },

  postcss: () => [
    autoprefixer({ browsers: 'last 2 versions' })
  ],

  plugins: BASE_PLUGINS.concat(ENV === 'production' ? PRODUCTION_PLUGINS : []),

  devtool: (ENV === 'production') ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    publicPath: '/',
    contentBase: `${__dirname}`,
    historyApiFallback: true,
  }
};
