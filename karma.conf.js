/**
 * Created by yeoman generator-makrina 0.4.0 on 11/11/2016.
 */

//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: './',
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/gentelella/vendors/jquery/dist/jquery.min.js',
      '**/*.module.js',
      '**/*.service.js',
      '**/*.component.js',
      // '**/*.spec.js',
      '**/*.jquery.js'
    ],
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: [
      'Chrome'
      // 'Firefox'
    ],
    plugins: [
      'karma-chrome-launcher',
      // 'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      // '**/*.component.js': ['coverage']
    },
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: '../../coverage/'},
        {type: 'text'},
        {type: 'text-summary'}
      ]
    }
  });
};
