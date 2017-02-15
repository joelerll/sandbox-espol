var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var path = require('path');
var PROD = JSON.parse(process.env.PROD_ENV || '0');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var UglifyJsPlugin = require('uglify-js-plugin');
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
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
      "./apps_angular/admin/app.w.js"
    ],
    output: {
        path: __dirname,
        filename: "bundle.min.js"
    },
    resolve: {
   modulesDirectories: ['node_modules', 'public/bower_components'],
   alias: {
     'npm': __dirname + '/node_modules',
     'vendor': __dirname + '/app/vendor/',
     'bower': __dirname + '/public/bower_components'
   },
   alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
 },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: "file-loader?name=[name].[ext]"}
        ]
    },
    plugins: [
    new webpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'public/'),
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
    }),
    new BowerWebpackPlugin(
      {
        modulesDirectories: ["public/bower_components"],
        manifestFiles:      "bower.json",
        includes:           /.*/,
        excludes:           [],
        searchResolveModulesDirectories: true
      }
    ),
    new webpack.ProvidePlugin({
      'vue': 'vue',
      "angular": 'angular'
    }),
    new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: '"production"'
     }
   })
  ]
};
