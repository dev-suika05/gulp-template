const gulp = require('gulp');

const sass = require('gulp-dart-sass');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");


const srcBase = './src';
const assetsBase = './src/assets';
const distBase = './dist';


const srcPath = {
  'scss': assetsBase + '/css/**/*.scss',
  'html': srcBase + '/**/*.html'
};

const distPath = {
  'html': distBase + '/',
  'css': distBase + '/css/',
  'js': distBase + '/js/',
  'img': distBase + '/img/',
};

const cssSass = () => {
  return gulp.src(srcPath.scss, {
    sourcemaps: true
  })
    .pipe(
      plumber({
        errorHandler: notify.onError('Error:<%= error.message %>')
      }))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(distPath.css, { sourcemaps: './' }))
    .pipe(browserSync.stream())
}

const jsBabel = () => {
  return src(srcPath.js)
    .pipe(
      plumber(
        {
          errorHandler: notify.onError('Error: <%= error.message %>')
        }
      )
    )
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest(destPath.js))
    .pipe(uglify())
    .pipe(
      rename(
        { extname: '.min.js' }
      )
    )
    .pipe(dest(destPath.js))
}

exports.default = series(cssSass, jsBabel);


const html = () => {
  return gulp.src(srcPath.html)
    .pipe(gulp.dest(distPath.html))
}

const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}

const browserSyncOption = {
  server: distBase
}

const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

const watchFiles = () => {
  gulp.watch(srcPath.scss, gulp.series(cssSass))
  gulp.watch(srcPath.html, gulp.series(html, browserSyncReload))
}

exports.default = gulp.series(
  gulp.parallel(html, cssSass),
  gulp.parallel(watchFiles, browserSyncFunc)
);
