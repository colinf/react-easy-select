var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');

var path = {
  EXAMPLE: 'example',
  EXAMPLE_APP: './src/example/example-app.js',
  LIB: 'lib',
  OUT: 'bundle.js',
  SRC: 'src/**.js*'
};

gulp.task('build/lib', function(){
  return gulp.src(path.SRC)
    .pipe(babel())
    .pipe(gulp.dest(path.LIB));
});

gulp.task('build/example', function(){
    browserify(path.EXAMPLE_APP)
        .transform(babelify)
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.EXAMPLE));
});

gulp.task('watch/example', function() {
    gulp.watch("./src/**/*.js*", ['build/example']);
});

gulp.task('build', ['build/example', 'build/lib']);
gulp.task('example', ['build/example', 'watch/example']);
gulp.task('default', ['build']);