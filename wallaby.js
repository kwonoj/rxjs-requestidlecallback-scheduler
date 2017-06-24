const wallabyWebpack = require('wallaby-webpack');

module.exports = () => ({
  files: [
    { pattern: 'index.ts', load: false },
    { pattern: 'src/**/*.ts', load: false }
  ],

  tests: [
    { pattern: 'spec/**/*.ts', load: false }
  ],

  testFramework: {
    type: "mocha"
  },

  env: {
    kind: "electron"
  },

  postprocessor: wallabyWebpack(),

  setup: function () {
    // required to trigger test loading
    window.__moduleBundler.loadTests();
  }
})