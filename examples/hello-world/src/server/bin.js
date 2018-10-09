const path = require('path')
const startServer = require('@jaredlunde/example-server/react/startServer')


module.exports = startServer({
  clientConfig: require('../client/webpack.config'),
  serverConfig: require('./webpack.config')
})
