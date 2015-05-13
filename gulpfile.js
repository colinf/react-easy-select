var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var webserver = require('gulp-webserver');

var path = {
  MINIFIED_OUT: 'bundle.min.js',
  OUT: 'bundle.js',
  DEST: 'dist',
  EXAMPLE: 'example',
  EXAMPLE_APP: './example/app.js',
  ENTRY_POINT: './src/SimpleSelect.react.js'
};

gulp.task('js', function(){
    browserify(path.ENTRY_POINT)
        .transform(babelify)
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('example/build', function(){
    browserify(path.EXAMPLE_APP)
        .transform(babelify)
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.EXAMPLE));
});
gulp.task('example/watch', function() {
    gulp.watch("./src/**/*.js*", ["example/build"]);
});

gulp.task('webserver', function() {
  gulp.src(path.EXAMPLE)
    .pipe(webserver({
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('watch', function() {
    gulp.watch("./src/**/*.js*", ["js"]);
});

gulp.task('example', ['example/build', 'webserver', 'example/watch']);
gulp.task('default', ['js', 'webserver', 'watch']);