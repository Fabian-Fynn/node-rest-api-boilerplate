import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const paths = {
  js: './app/**/*.js',
  nonJs: './app/**/*.!(js)',
  tests: './dist/app/tests/**/*.js'
};

gulp.task('clean', () => {
  return gulp.src('./dist', {
        allowEmpty: true
    })
    .pipe(plugins.clean());
});

gulp.task('copy', () => {
  return gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
  return gulp.src(paths.js)
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', { sourceRoot: './../src' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', gulp.series(gulp.parallel('copy', 'babel'), () => {
  return plugins.nodemon({
    script: path.join('dist/app', 'app.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babel']
  });
}));

gulp.task('serve', gulp.series('clean', 'nodemon'));

gulp.task('test', gulp.series('clean', 'babel', () => {
  return gulp.src(paths.tests)
    .pipe(plugins.ava({ verbose: true }))
    .on('error', (err) => {
      console.log(err.message);
      process.exit(1);
    })
    .on('end', () => console.log('completed'));
}));

gulp.task('default', gulp.series('clean', 'babel', 'copy'));
