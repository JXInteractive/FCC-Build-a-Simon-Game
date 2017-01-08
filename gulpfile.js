/* NPM modules and imports:
 ****************************************/

var browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    del = require('del'),
    es6transpiler = require('gulp-es6-transpiler'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    htmlclean = require('gulp-htmlclean'),
    js_obfuscator = require('gulp-js-obfuscator'),
    jshint = require('gulp-jshint'),
    minify = require('gulp-minify'),
    newer = require('gulp-newer'),
    pkg = require('./package.json'),
    pleeease = require('gulp-pleeease'),
    preprocess = require('gulp-preprocess'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify');


/* File locations:
 ****************************************/

var devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
  // Do not use absolute ./paths - watch fails to detect new and deleted files
  source = 'source/',
  dest = 'build/',
  html = {
    in: source + '*.html',
    watch: [source + '*.html', source + 'template/**/*'],
    out: dest,
    context: {
      devBuild: devBuild,
      author: pkg.author,
      version: pkg.version
    }
  },
  css = {
    in: source + 'scss/main.scss',
    watch: [source + 'scss/**/*'],
    out: dest + 'css/',
    sassOpts: {
      outputStyle: 'nested',
      imagePath: '../images',
      precision: 3,
      errLogToConsole: true
    },
    pleeeaseOpts: {
      autoprefixer: { browsers: ['last 2 versions', '> 2%']},
      rem: ['16px'],
      pseudoElements: true,
      mqpacker: true,
      minifier: !devBuild
    }
  },
  js = {
    in: source + 'js/**/*',
    out: dest + 'js/',
    filename: 'bundle.js'
  },
  syncOpts = {
    server: {
      baseDir: dest,
      index: 'index.html'
    },
    open: false,
    notify: true
  };


/* Show build type:
 ****************************************/

console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');


/* Task: "clean" (deletes build contents):
 ****************************************/

gulp.task('clean', function() { del([dest + '*']); });


/* Task: "html" (builds HTML files):
 ****************************************/

gulp.task('html', function() {
  var page = gulp.src(html.in).pipe(preprocess({ context: html.context }));
  if (!devBuild) {
    page = page
      .pipe(size({ title:'HTML in' }))
      .pipe(htmlclean())
      .pipe(size({ title:'HTML out' }));
  }
  return page.pipe(gulp.dest(html.out));
});


/* Task: "sass" (compile Sass):
 ****************************************/

gulp.task('sass', function() {
  return gulp.src(css.in)
    .pipe(sass(css.sassOpts))
    .pipe(size({title:'CSS in '}))
    .pipe(pleeease(css.pleeeaseOpts))
    .pipe(size({title:'CSS out '}))
    .pipe(gulp.dest(css.out))
    .pipe(browsersync.reload({ stream: true }));
});


/* Task: "js" (process and output JS):
 ****************************************/

gulp.task('js', function() {
  if (devBuild) {
    return gulp.src(js.in)
      .pipe(newer(js.out))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'))
      .pipe(gulp.dest(js.out));
  }
  else {
    del([ dest + 'js/*' ]);
    return gulp.src([
      source + 'js/classes.js',
      source + 'js/config.js',
      source + 'js/app.js'
    ])
      .pipe(concat(js.filename))
      .pipe(size({ title:'JS in' }))
      .pipe(es6transpiler())
      //.pipe(stripdebug())
      .pipe(uglify().on('error', gutil.log))
      .pipe(minify({ ext:{ src:'-debug.js', min:'.js' }, exclude: ['tasks'], ignoreFiles: ['.combo.js', '-min.js'] }))
      .pipe(js_obfuscator({}, ["**/jquery-*.js"]))
      .pipe(size({ title:'JS out' }))
      .pipe(gulp.dest(js.out));
  }
});


/* Task: "browsersync" (browsersync config):
 ****************************************/

gulp.task('browsersync', function() { browsersync(syncOpts); });


/* Task: "default" (default task(s)):
 ****************************************/

gulp.task('default', ['html', 'sass', 'js', 'browsersync'], function() {
  gulp.watch(html.watch, ['html', browsersync.reload]);
  gulp.watch(css.watch, ['sass']);
  gulp.watch(js.in, ['js', browsersync.reload]);
});
