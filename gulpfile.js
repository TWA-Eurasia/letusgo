'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('less_compiler', function () {

  return gulp.src('public/style/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('htmlc', function () {

  return gulp.src('view/*.jade')
    .pipe(less())
    .pipe(gulp.dest('.tmp/views'));
});


gulp.task('clean', del.bind(null, ['.tmp']));

gulp.task('serve', ['less_compiler','htmlc'], function () {

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['public', '.tmp'],
      routes: {
        '/images': 'images',
        '/styles': 'styles'
      }
    }
  });

  gulp.watch([
    'public/styles/**/*.less',
    'view/*.jade'
  ]).on('change', reload);

  gulp.watch('public/styles/**/*.less', ['less_compiler', reload]);
  gulp.watch('view/*.jade',['htmlc', reload]);
});
