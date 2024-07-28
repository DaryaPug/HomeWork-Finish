const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();


function css() {
    return gulp
        .src('./src/sass/style.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(postcss([autoprefixer()]))
        .pipe(
            rename({
                suffix: ".min",
            }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

function clear() {
    return gulp.src('build',{read: false, allowEmpty: true })
        .pipe(clean());
};
function watching() {
    gulp.watch('./src/sass/**/*.scss', css);
    gulp.watch('./src/*.html', html);
}
function html() {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
}
function server(){

    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
}
function OptimizationImage(done) {
    console.log('OptimizationImage')
    done()
}
function copy() {
    return gulp.src('./src/assets/**/*',{
        encoding: false,})
.pipe(gulp.dest('./build'));
}


exports.start = gulp.series(clear, gulp.parallel(css, html, copy, OptimizationImage), gulp.parallel(watching, server));
