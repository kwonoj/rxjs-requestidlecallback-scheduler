module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: ['spec/*.ts'],
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    // webpack configuration
    webpack: {
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [{ loader: 'ts-loader' }]
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
      }
    },

    preprocessors: {
      'spec/**/*.ts': ['webpack'],
      'src/**/*.ts': ['webpack', 'coverage'],
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [{ type: 'lcov' }]
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Firefox'],
    singleRun: true,
  });
};