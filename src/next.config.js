const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withPurgeCss = require('next-purgecss')
module.exports = withCss(withSass(withPurgeCss({
  dir: './src',
  purgeCssPaths: [
    'pages/**/*',
    'components/**/*',
    'containers/**/*'
  ],
  purgeCss: {
    whitelist: () => ['__next']
  }
})))
