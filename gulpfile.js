var gulp = require('gulp')

var universaljsx = require('./main')
var through = require('through2')

var plumber = require('gulp-plumber')
var gutil = require('gulp-util')

var testJSX = './test/jsx/*.jsx'

function universaljsxTransform(options) {
  return through.obj(function (file, enc, cb) {
    try {
      file.contents = new Buffer(universaljsx.transform(file.contents.toString(), options))
      file.path = gutil.replaceExtension(file.path, '.js')
      this.push(file)
    }
    catch (err) {
      err.fileName = file.path
      this.emit('error', new gutil.PluginError('universaljsx', err))
    }
    cb()
  })
}

gulp.task('build', function() {
  return gulp.src(testJSX)
    .pipe(plumber())
    .pipe(universaljsxTransform({harmony: true}))
    .on('error', function(e) {
      console.error(e.message + '\n  in ' + e.fileName)
    })
    .pipe(gulp.dest('./test/js/'))
})

gulp.task('watch', function() {
  gulp.watch([testJSX], ['universaljsx'])
})

gulp.task('default', ['watch', 'universaljsx'])
