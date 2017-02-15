var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var path = require('path');
var PROD = JSON.parse(process.env.PROD_ENV || '0');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var UglifyJsPlugin = require('uglify-js-plugin');
var webpack = require('webpack');
// new webpackUglifyJsPlugin({
//   cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
//   debug: true,
//   minimize: true,
//   sourceMap: false,
//   output: {
//     comments: false
//   },
//   compressor: {
//     warnings: false
//   }
// })

module.exports = {
    entry: [
      "./pruebas/webpack/entry.js"
    ],
    output: {
        path: __dirname,
        filename: "bundle.min.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
    new webpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
      debug: true,
      minimize: true,
      sourceMap: false,
      output: {
       comments: false
      },
      compressor: {
       warnings: false
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
           compress: true, //default 'true', you can pass 'false' to disable this plugin
           debug: true //default 'false', it will display some information in console
       }),
    new UnminifiedWebpackPlugin({
      postfix: ''
    })
  ]
};
