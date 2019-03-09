const withImages = require('next-images')
const withSass = require('@zeit/next-sass')
const withPurgeCss = require('next-purgecss')

const pipeline = config => withImages(withSass(withPurgeCss(config)))

module.exports = pipeline({
  dir: __dirname,
  distDir: '../dist/.next',
  webpack (config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })

    return config
  },
  purgeCss: {
    whitelistPatterns: [/^bx--*/],
  }
})
