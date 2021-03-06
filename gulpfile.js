/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  copy = require('gulp-contrib-copy'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del');

// Styles
gulp.task('styles', function() {
  return sass('assets/sass/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''))
    .pipe(rename({ suffix: '' }))
    .pipe(cssnano())
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['bower_components/angular/angular.js', 'bower_components/angular-resource/angular-resource.js', 'bower_components/angular-ui-router/release/angular-ui-router.js', 'assets/js/app.js', 'assets/js/custom.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(''))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(''))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

// Clean
// gulp.task('clean', function() {
//   return del(['dist/styles', 'dist/scripts', 'dist/images']);
// });

// Default task
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'watch');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('assets/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});