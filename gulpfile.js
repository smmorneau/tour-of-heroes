const del = require('del');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const colors  = require('colors');
const concat = require('gulp-concat');
const liveServer = require('gulp-live-server');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');
const sysBuilder = require('systemjs-builder');
const tslint = require('gulp-tslint');
const tsc = require('gulp-typescript');
const uglify = require('gulp-uglify');
const tsconfig = require('tsconfig-glob');

const tscConfig = require('./tsconfig.json');
const testTscConfig = require('./tests/tsconfig.json');

// Clean the js distribution directory
gulp.task('clean:dist:js', function () {
  return del('public/dist/js/*');
});

// Clean the css distribution directory
gulp.task('clean:dist:css', function () {
  return del('public/dist/css/*');
});

// Clean library directory
gulp.task('clean:lib', function () {
  return del('public/lib/**/*');
});

// Clean test build directory
gulp.task('clean:tests', function () {
  return del('tests/js/**/*');
});

// Lint Typescript
gulp.task('lint:ts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose', { emitError: false }));
});

// Compile TypeScript to JS
gulp.task('compile:ts', function () {
  return gulp
    .src(tscConfig.filesGlob)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('>>> [tsc] Typescript compilation failed'.bold.green);
        this.emit('end');
      }}))
    .pipe(sourcemaps.init())
    .pipe(tsc(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/dist'));
});

// Generate systemjs-based builds
gulp.task('bundle:js', function() {
  var builder = new sysBuilder('public', './system.config.js');
  return builder.buildStatic('app', 'public/dist/js/app.min.js')
    .then(function () {
      return del(['public/dist/js/**/*', '!public/dist/js/app.min.js']);
    })
    .catch(function(err) {
      console.error('>>> [systemjs-builder] Bundling failed'.bold.green);
    });
});

// Minify JS bundle
gulp.task('minify:js', function() {
  return gulp
    .src('public/dist/js/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

// Lint Sass
gulp.task('lint:sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('>>> [sass-lint] Sass linting failed'.bold.green);
        this.emit('end');
      }}))
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// Compile SCSS to CSS, concatenate, and minify
gulp.task('compile:sass', function () {
  // concat and minify global scss files
  gulp
    .src('src/css/global/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('>>> [sass] Sass global style compilation failed'.bold.green);
        this.emit('end');
      }}))
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/dist/css/global'));

  // minify component specific scss files
  gulp
    .src('src/css/component/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('>>> [sass] Sass component style compilation failed'.bold.green);
        this.emit('end');
      }}))
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/dist/css/component'));
});

// Concat and minify CSS
gulp.task('minify:css', function() {
  // concat and minify global css files
  gulp
    .src('src/css/global/*.css')
    .pipe(concat('global.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/dist/css/global'));

  // minify component css files
  gulp
    .src('src/css/component/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/dist/css/component'));
});

// Copy dependencies
gulp.task('copy:libs', function() {
  gulp.src(['node_modules/rxjs/**/*'])
    .pipe(gulp.dest('public/lib/js/rxjs'));

  gulp.src(['node_modules/angular2-in-memory-web-api/**/*'])
    .pipe(gulp.dest('public/lib/js/angular2-in-memory-web-api'));

  // concatenate non-angular2 libs, shims & systemjs-config
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/es6-promise/dist/es6-promise.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    // 'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'system.config.js',
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/lib/js'));

  // copy source maps
  gulp.src([
    'node_modules/es6-shim/es6-shim.map',
    'node_modules/reflect-metadata/Reflect.js.map',
    'node_modules/systemjs/dist/system-polyfills.js.map'
  ]).pipe(gulp.dest('public/lib/js'));

  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.*'
  ]).pipe(gulp.dest('public/lib/css'));

  return gulp.src(['node_modules/@angular/**/*'])
    .pipe(gulp.dest('public/lib/js/@angular'));
});

// UNUSED
// Copy static assets
gulp.task('copy:assets', function() {
  return gulp.src(
    [
      '*.json',
      '*.html',
      '*.css',
      '!*.ts',
      '!*.scss'
    ],
    { base : 'src/**' })
    .pipe(gulp.dest('public/dist'))
});

// Update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

// Watch src files for changes, then trigger recompilation
gulp.task('watch:src', function() {
  gulp.watch('src/**/*.ts', ['scripts']);
  gulp.watch('src/**/*.scss', ['styles']);
});

// Run Express, auto rebuild and restart on src changes
gulp.task('serve', ['watch:src'], function () {
  var server = liveServer.new('server.js');
  server.start();

  gulp.watch('server.js', server.start.bind(server));
});

// Compile .ts files unbundled for tests
gulp.task('compile:specs', function() {
  return gulp
    .src([
      "src/**/*.ts",
      "typings/*.d.ts"
    ])
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('>>> [tsc] Typescript tests compilation failed'.bold.green);
        this.emit('end');
      }}))
    .pipe(tsc(testTscConfig.compilerOptions))
    .pipe(gulp.dest('tests'));
});

gulp.task('test', ['compile:specs'], function() {
  gulp.watch('src/**/*.ts', ['compile:specs']);
});

gulp.task('lint', ['lint:ts', 'lint:sass']);

gulp.task('clean', ['clean:dist:js', 'clean:dist:css', 'clean:lib', 'clean:tests']);

gulp.task('copy', function(callback) {
  runSequence('clean:lib', 'copy:libs', callback);
});
gulp.task('scripts', function(callback) {
  runSequence(['lint:ts', 'clean:dist:js'], 'compile:ts', 'bundle:js', 'minify:js', callback);
});
gulp.task('styles', function(callback) {
  runSequence(['lint:sass', 'clean:dist:css'], ['compile:sass', 'minify:css'], callback);
});
gulp.task('build', function(callback) {
  runSequence('copy', 'scripts', 'styles', callback);
});

gulp.task('default', function(callback) {
  runSequence('build', 'serve', callback);
});