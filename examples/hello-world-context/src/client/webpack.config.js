const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {createConfig} = require('@jaredlunde/example-server/react')


let productionPlugins = [], productionOutput = {}, productionOptimization = {}

if (process.env.NODE_ENV === 'production') {
  productionPlugins = [
    new webpack.optimize.AggressiveSplittingPlugin({minSize: 24000, maxSize: 96000}),
    new webpack.LoaderOptionsPlugin({minimize: false, debug: false})
  ]

  productionOutput = {
    globalObject: 'window'
  }

  productionOptimization = {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        uglifyOptions: {
          compress: {passes: 2, drop_console: false, dead_code: true},
          output: {comments: false},
          sourceMap: false
        }
      })
    ]
  }
}

module.exports = createConfig({
  name: 'client',
  target: 'web',
  mode: process.env.NODE_ENV,

  entry: [path.join(__dirname, './render.js')],

  output: {
    globalObject: 'this',
    path: path.join(__dirname, '../../dist/client'),
    filename: `js/hello-world.development.js`,
    chunkFilename: `js/hello-world.development.[chunkhash].js`,
    publicPath: '/public/',
    ...productionOutput
  },

  plugins: [
    new webpack.DefinePlugin({
      __PLATFORM__: JSON.stringify('client'),
      __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
    }),
    ...productionPlugins
  ],

  optimization: productionOptimization
})
