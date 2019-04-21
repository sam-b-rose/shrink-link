module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-easy-import')({
      prefix: '_',
    }),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    require('postcss-reporter')({
      clearReportedMessages: true,
    }),
  ],
}
