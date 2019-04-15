const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPurgeCss = require('next-purgecss')

const isDev = process.env.NODE_ENV !== 'production'

const purgeCssConfig = isDev
  ? {}
  : withPurgeCss({
    purgeCssPaths: [
      'pages/**/*',
      'components/**/*',
      'containers/**/*'
    ],
    purgeCss: {
      whitelist: () => ['html', '__next']
    }
  })

module.exports = withCss(withSass({
  dir: './src',
  ...purgeCssConfig
}))
