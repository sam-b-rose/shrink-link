module.exports = {
  testPathIgnorePatterns: ['<rootDir>/src/.next/', '<rootDir>/dist/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.mock.js',
    '\\.(css)$': '<rootDir>/__mocks__/style.mock.js',
  },
}
