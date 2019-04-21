const path = require('path')

module.exports = async ({ config }) => {
  const ruleIdx = config.module.rules.findIndex(rule => String(rule.test) === String(/\.css$/))
  config.module.rules[ruleIdx] = {
    test: /\.css$/,
    loaders: [
      'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, '../'),
          }
        }
      }
    ],
    include: path.resolve(__dirname, '../src'),
  }
  return config
}
