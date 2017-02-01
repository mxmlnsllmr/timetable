const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: [
  'webpack-hot-middleware/client?http://127.0.0.1:8080/', // WebpackDevServer host and port
  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  './src/app-client.js' // Your appʼs entry point
],
    output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js',

  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader'],
      include: path.join(__dirname, 'src'),

    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
};
