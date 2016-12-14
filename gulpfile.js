/**
 * Created by yeoman generator-makrina 0.4.0 on 11/11/2016.
 *
 * Gulp configuration
 * Adapted from gulpfile-ninecms
 *
 * gulp (watch) : for development
 * gulp build : for a one off development build
 * gulp build --production : for a minified production build
 */

/*
 * Configuration
 */
var paths = {
  js_lint: [
    'gentelella/*.js',
    '*.js'
  ],
  build: 'build/',
  admin: {
    sass: [
      'gentelella/*.s?ss'
    ],
    css: [
      'node_modules/gentelella/vendors/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/font-awesome.css',
      'node_modules/gentelella/vendors/nprogress/nprogress.css',
      'node_modules/gentelella/vendors/iCheck/skins/flat/green.css',
      'node_modules/gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.css',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.buttons.css',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.nonblock.css',
      'node_modules/gentelella/vendors/select2/dist/css/select2.min.css',
      'build/admin/css/gentelella.*.css'
    ],
    js_watch: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.js',
      'node_modules/gentelella/vendors/fastclick/lib/fastclick.js',
      'node_modules/gentelella/vendors/nprogress/nprogress.js',
      'node_modules/gentelella/vendors/Chart.js/dist/Chart.min.js',
      'node_modules/gentelella/vendors/gauge.js/dist/gauge.min.js',
      'node_modules/gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js',
      'node_modules/gentelella/vendors/iCheck/icheck.min.js',
      'node_modules/gentelella/vendors/skycons/skycons.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.pie.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.time.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.stack.js',
      'node_modules/gentelella/vendors/Flot/jquery.flot.resize.js',
      'node_modules/gentelella/production/js/flot/jquery.flot.orderBars.js',
      'node_modules/gentelella/production/js/flot/date.js',
      'node_modules/gentelella/production/js/flot/jquery.flot.spline.js',
      'node_modules/gentelella/production/js/flot/curvedLines.js',
      'node_modules/gentelella/production/js/moment/moment.min.js',
      'node_modules/gentelella/production/js/datepicker/daterangepicker.js',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.js',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.buttons.js',
      'node_modules/gentelella/vendors/pnotify/dist/pnotify.nonblock.js',
      'node_modules/gentelella/vendors/select2/dist/js/select2.full.js',

      'gentelella/*.module.js',
      'gentelella/**/*.module.js',
      'gentelella/**/*.component.js',
      'gentelella/**/*.service.js',

      'build/partials.js'
    ],
    partials: [
      '../*ng-gentelella/gentelella/**/*.html'
    ],
    build: 'build/'
  }
};
var config = {
  autoprefixer_versions: ['last 2 version', 'safari 5', 'ie 8', 'ie 9']
};
var images = [];

/*
 * Include section
 */
'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var argv = require('yargs').argv;
// css
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// sass/less
var sass = require('gulp-sass');
// js
var uglify = require('gulp-uglify');
// partials
var minifyHtml = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
// linting
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
// testing/mocha
var nsp = require('gulp-nsp');
var karmaServer = require('karma').Server;
var path = require('path');
var fs = require('fs');

/*
 * Prepare
 */
// gulp build --production
var production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
var build = argv._.length ? argv._[0] === 'build' : false;
var watch = argv._.length ? argv._[0] === 'watch' : true;

/*
 * Error notification methods
 */
var handleError = function (task) {
  return function (err) {
    notify.onError({
      message: task + ' failed, check the logs',
      sound: false
    })(err);
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

/**
 * CUSTOM TASK METHODS
 */
var tasks = {
  /*
   * Delete build folder
   */
  clean: function () {
    return del([paths.build]);
  },

  /*
   * linting
   */
  lintjs: function () {
    return gulp.src(paths.js_lint)
      .pipe(excludeGitignore())
      .pipe(eslint({
        rules: {
          // control characters eg `\n` are required for file appends
          'no-control-regex': 'off',
          // allow double quotes to avoid escaping single
          'quotes': ['error', 'single', {avoidEscape: true}],
          // relax curly
          'curly': ['error', 'multi-line']
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .on('error', handleError('LINT'));
  },

  /*
   * Testing security exploits with NSP
   */
  nsp: function (cb) {
    nsp({package: path.resolve('package.json')}, cb);
  },

  /*
   * Testing with karma
   */
  karma: function (done) {
    new karmaServer({
      configFile: path.join(__dirname, '/karma.conf.js'),
      singleRun: true
    }, function () {
      done();
    }).start();
  },

  /**
   * ADMIN
   */

  /*
   * CSS
   */
  adminCss: function () {
    return gulp.src(paths.admin.css)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('CSS'))
      .pipe(concat('style.min.css'))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      .pipe(gulpif(production, minifyCSS()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.admin.build + 'css/'));
  },

  /*
   * SASS
   */
  adminSass: function () {
    return gulp.src(paths.admin.sass)
    // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      .pipe(gulpif(!production, sourcemaps.init({'loadMaps': true})))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      // we don't serve the source files so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({'includeContent': true}))
      .pipe(gulp.dest(paths.admin.build + 'css/'));
  },

  /*
   * Concatenate js
   */
  adminConcatJs: function () {
    // paths.admin.js_watch.forEach(fs.statSync);
    return gulp.src(paths.admin.js_watch)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('JS'))
      .pipe(concat('index.min.js'))
      .pipe(gulpif(production, uglify({preserveComments: 'license', mangle: false})))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.admin.build + 'js/'));
  },

  /*
   * Pre-load angular templates
   */
  preloadNgHtml: function () {
    return gulp.src(paths.admin.partials)
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(ngHtml2Js({
        moduleName: function (file) {
          var pathParts = file.path.split('/');
          var folder = pathParts[pathParts.length - 2];
          return folder.replace(/-[a-z]/g, function (match) {
            return match.substr(1).toUpperCase();
          });
        }
      }))
      .pipe(concat('partials.js'))
      .pipe(gulp.dest(paths.admin.build));
  }
};

/*
 * CUSTOMS TASKS
 */
gulp.task('clean', tasks.clean);
// for production we require the clean method on every individual task
var req = build ? ['clean'] : [];
// individual tasks
gulp.task('lintjs', tasks.lintjs);
gulp.task('nsp', tasks.nsp);
gulp.task('karma', tasks.karma);
gulp.task('adminSass', req, tasks.adminSass);
gulp.task('adminCss', req.concat(['adminSass']), tasks.adminCss);
gulp.task('preloadNgHtml', req, tasks.preloadNgHtml);
gulp.task('adminConcatJs', req.concat(['preloadNgHtml']), tasks.adminConcatJs);

// build task
gulp.task('build', [
  'adminCss',
  'adminConcatJs'
]);

// test task
gulp.task('test', [
  'lintjs',
  'nsp',
  'karma'
]);

/*
 * DEV/WATCH TASK
 */
gulp.task('watch', ['build'], function () {
  gulp.watch(paths.admin.css, ['adminCss']);
  gulp.watch(paths.admin.sass, ['adminSass', 'adminCss']);
  gulp.watch(paths.admin.js_watch, ['adminConcatJs']);
  gulp.watch(paths.admin.partials, ['adminConcatJs']);
  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['watch']);
