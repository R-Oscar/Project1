'use strict';

var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    modernizr = require('gulp-modernizr'),
    wiredep = require('wiredep').stream,
    rimraf = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size');

gulp.task('wiredep', function() {
    gulp.src('app/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('app/'))
});

// Модернайзер
gulp.task('modernizr', function () {
    gulp.src('app/js/*.js').pipe(modernizr(
    {
        // Подключаем необходимые опции
        "options" : [
            "setClasses",
            "html5shiv"
        ],

        // Подключаем необходимый набор тестов
        "tests" : ['placeholder', 'cssanimations', 'opacity'],

        // Собрать минифицированную версию
        "uglify" : true,
    })).pipe(gulp.dest("app/js/vendor"))
});

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch('bower.json', ['wiredep']);
});

// Задача по-умолчанию
gulp.task('default', ['modernizr', 'server', 'watch']);

// СБОРКА
// Переносим HTML, CSS, JS в папку dist
gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
})

// Очистка
gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
    .pipe(rimraf());
})

// Перенос шрифтов
gulp.task('fonts', function() {
    gulp.src('app/fonts/*')
        .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff', '*woff2']))
        .pipe(gulp.dest('dist/fonts/'))
});

// Картинки
gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'));
});

// Остальные файлы
gulp.task('extras', function() {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ]).pipe(gulp.dest('dist'));
});

// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean'], function() {
    gulp.start('dist');
});

// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function() {
    return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// ПРОВЕРИТЬ! Всё ли работает?
gulp.task('serverdist', function() {
    browserSync({
        port: 8888,
        server: {
            baseDir: 'dist'
        }
    });
});