/* eslint-disable @typescript-eslint/no-var-requires */

const withCss = require('@zeit/next-css')
const withPurgeCss = require('next-purgecss')
const withTypescript = require('@zeit/next-typescript')

const isDev = process.env.NODE_ENV !== 'production'
const mode = isDev ? 'dev' : 'prod'

const pipeline = {
  dev: [withCss, withTypescript],
  prod: [withPurgeCss, withCss, withTypescript]
}

const baseConfig = {
  dir: './src'
}

const envConfig = {
  dev: {
    purgeCssPaths: ['pages/**/*', 'components/**/*'],
    purgeCss: {
      whitelist: () => ['html', '__next']
    }
  },
  prod: {}
}

function compose(config, mode) {
  return pipeline[mode].reduce((config, next) => next(config), config)
}

module.exports = compose({ ...baseConfig, ...envConfig }, mode)
