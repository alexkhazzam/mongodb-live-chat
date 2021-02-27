const gulp = require('gulp');

gulp.task('task-name', () => {
  return gulp
    .src('source-files')
    .pipe(aGulpPlugin())
    .pipi(gulp.dest('destination'));
});
