var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('ex1', shell.task([
  'node ./example_1.js'
]));

gulp.task('ex2', shell.task([
  'node ./example_2.js'
]));

gulp.task('ex3', shell.task([
  'node ./example_3.js'
]));
