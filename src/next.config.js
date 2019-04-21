const withCss = require('@zeit/next-css')
const withPurgeCss = require('next-purgecss')

const isDev = process.env.NODE_ENV !== 'production'

const purgeCssConfig = isDev
  ? {}
  : withPurgeCss({
      purgeCssPaths: ['pages/**/*', 'components/**/*'],
      purgeCss: {
        whitelist: () => ['html', '__next'],
      },
    })

module.exports = withCss({
  dir: './src',
  ...purgeCssConfig,
})
