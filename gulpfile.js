var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

// var scripts = require('./scripts');
// var styles = require('./styles');

var devMode = false;

gulp.task('default', ['sass']);

// Static Server + watching scss/html files
gulp.task('browser-sync', ['sass'], function() {

  browserSync.init({
      server: "./"
  });

  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch(["/index.html","home.html",
  "about/*.html", "about/*.js", "about/*.specs.js",
  "contact/*.html", "contact/*.js", "about/*.specs.js","contat/*.service.js",
  "dashboard/*.html", "dashboard/*.js", "dashboard/*.specs.js"])
  .on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
 gulp.task('sass', function () {
  return gulp.src(['style.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('minify-css',function(){
  return gulp.src(['css/style.css'])
          .pipe(minifyCSS({keepSpecialComments:1}))
          .pipe(gulp.dest('dist/style/*.min.js'))

});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('scripts/*.js'),
        uglify(),
        gulp.dest('dist/scripts')
    ],
    cb
  );
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

/*******BUILD SCRIPT STARTS*******/

// gulp.task('css', function() {
//   gulp.src(styles)
//       .pipe(concat('main.css')) //output filename
//       .pipe(gulp.dest('dist/css'))
//       .pipe(browserSync.reload({
//           stream: true
//       }));
// });

// gulp.task('js', function() {
//   gulp.src(scripts)
//       .pipe(concat('scripts.js'))
//       .pipe(gulp.dest('./dist/js'))
//       .pipe(browserSync.reload({
//           stream: true
//       }));
// });

// gulp.task('html', function() {
//   return gulp.src('./src/templates/**/*.html')
//       .pipe(gulp.dest('./dist/'))
//       .pipe(browserSync.reload({
//           stream: true
//       }));
// });

// gulp.task('build', function() {
//   gulp.start(['css', 'js', 'html'])
// });

// gulp.task('start', function() {
//   devMode = true;
//   gulp.start(['build', 'browser-sync']);
//   gulp.watch(['./src/css/**/*.css'], ['css']);
//   gulp.watch(['./src/js/**/*.js'], ['js']);
//   gulp.watch(['./src/templates/**/*.html'], ['html']);
// });


/*******BUILD SCRIPT ENDS*******/