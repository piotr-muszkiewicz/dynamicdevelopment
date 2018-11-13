const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task('sass', function(){
    return gulp.src('app/scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', onError)
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src(
        [
            'app/js/vendor/html5shiv.js',
            'app/js/vendor/jquery-1.11.2.min.js',
            'app/js/vendor/slick.js',
            'app/js/vendor/waypoints.min.js',
            'app/js/vendor/jquery.fancybox.js',
            'app/js/vendor/aos.js',
            'app/js/vendor/jquery.counterup.min.js',
            'app/js/vendor/main.js'
        ]
    )
        .pipe(concat('main.js'))
        .pipe(uglify())
        .on('error', onError)
        .pipe(gulp.dest('app/js/'));
});


gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/scss/modules/**/*.scss', ['sass']);
    gulp.watch('app/js/vendor/*.js', ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/main.js', browserSync.reload);
    gulp.watch('app/css/*.css', browserSync.reload({stream: true}));
});


gulp.task('default',['watch']);

function onError(err) {
    console.log(err);
    this.emit('end');
}