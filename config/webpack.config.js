
const { merge } = require('webpack-merge')


const envConfig = process.env.NODE_ENV === 'production' ?
  require('./webpack.config.prod') :
  require('./webpack.config.dev')


module.exports = merge(
  require('./webpack.config.common'),
  envConfig
)