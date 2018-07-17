const { resolve } = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const config = {
  entry: [
    './lib/server.js',
  ],
  target: 'node',
  context: __dirname,
  output: {
    filename: 'server.js',
    path: __dirname,
  },
  externals: nodeModules,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: true,
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') }, 'process.env.PORT': 8080 }),
  ],

  resolve: {
    extensions: ['.js'],
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = config;
