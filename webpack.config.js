const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/app-client.js",
  output: {
    path: path.resolve(__dirname, "src/static/js"),
    filename: 'bundle.js',
    publicPath: "http://localhost:8080/src/static/"
  },

  /*entry:   path.join(__dirname, 'src', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js'*/

  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      //test: /\.js$/,
      exclude: /node_modules/,
      loader:'babel-loader',
      query: {
        //cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015', 'react-hmre']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })*/
  ]
};
