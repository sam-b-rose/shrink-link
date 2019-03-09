const { merge } = require('lodash')
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  port: 3000
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev')
    break
  default:
    envConfig = require('./prod')
}

module.exports = merge(baseConfig, envConfig)
