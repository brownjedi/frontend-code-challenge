module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverageFrom: ['src/**/*.{js,ts,vue}', '!**/node_modules/**'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },
  globals: {
    'vue-jest': {
      experimentalCSSCompile: true, // default is actually true, so just make sure it isn't false
    },
  },
}
