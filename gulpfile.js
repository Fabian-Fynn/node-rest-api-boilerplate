var gulp = require("gulp");
var path = require("path");
var gulpLoadPlugins = require("gulp-load-plugins");

// Not all gulp plugins follow the convention of gulp-* names.
// For example, it's 'del', not 'gulp-del'.
const plugins = gulpLoadPlugins({
  pattern: [
    'gulp-*', 
    'gulp.*', 
    '@*/gulp{-,.}*', 
    'del', 
    'run-sequence',
  ]
});

const paths = {
    js: ['app/**/*.js', '!dist/**', '!node_modules/**'],
    nonJs: ['./package.json', './.gitignore', './.env', './app/public/**/*'],
    tests: './dist/app/tests/**/*.js'
};

gulp.task('clean', () =>
  plugins.del.sync(['dist/**', 'dist/.*'])
);

gulp.task('copy', () =>
  gulp.src(paths.nonJs, {base: '.'})
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
);

gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
  .pipe(gulp.dest('dist'))
);

gulp.task('nodemon', ['copy', 'babel'], () =>
  plugins.nodemon({
    script: path.join('dist/app', 'app.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babel']
  })
);

gulp.task('serve', ['clean'], () => plugins.runSequence('nodemon'));

gulp.task('test', ['clean', 'babel'], () => {
  gulp.src(paths.tests)
    .pipe(plugins.ava({verbose: true}))
    .on('error', function(err) {
      console.log(err.message);
      process.exit(1);
    })
    .on('end', function() {
      console.log('completed');
    });
});

gulp.task('default', ['clean'], () => {
  plugins.runSequence(
    ['babel', 'copy']
  );
});
