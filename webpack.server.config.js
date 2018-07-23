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
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') }, 'process.env.PORT': 3000 }),
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
