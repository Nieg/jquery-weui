const gulp = require('gulp');
const concat = require('gulp-concat');
const header = require('gulp-header');
const connect = require("gulp-connect");
const less = require("gulp-less");
const autoprefixer = require('gulp-autoprefixer');
const ejs = require("gulp-ejs");
const uglify = require('gulp-uglify');
const ext_replace = require('gulp-ext-replace');
const cssmin = require('gulp-cssmin');

const cfg = require('./build/build.config')

// 引入路径
const srcs = cfg.paths.srcs;
const dsts = cfg.paths.dsts;
// console.log(srcs, dsts);

gulp.task('js', function (cb) {

  count = cfg.jsConcats.length;
  var end = function () {
    if (--count <= 0)
      cb();
  };

  cfg.jsConcats.forEach(function (c, i, arr) {
    gulp.src(c.srcs.slice().map(function (x) {
      return srcs.js + x
    })).pipe(concat({ path: c.dst }))
      .pipe(gulp.dest(dsts.js))
      .on("end", end);
  });

});


gulp.task('uglify', gulp.series("js", function (cb) {
  return gulp.src([dsts.js + '**/*.js', '!' + dsts.js + '**/*.min.js'])
    .pipe(uglify({
      //preserveComments: "license"
    }))
    .pipe(ext_replace('.min.js'))
    .pipe(gulp.dest(dsts.js));
  cb();
}));

gulp.task('less', function (cb) {
  return gulp.src([srcs.less + '**/*.less', '!' + srcs.less + '**/_*.less'])
    .pipe(less({ javascriptEnabled: true }))
    .pipe(autoprefixer())
    .pipe(header(cfg.banner))
    .pipe(gulp.dest(dsts.less));
});

gulp.task('cssmin', gulp.series("less", function (cb) {
  gulp.src([dsts.css + '**/*.css', '!' + dsts.css + '**/*.min.css'])
    .pipe(cssmin())
    .pipe(header(cfg.banner))
    .pipe(ext_replace('.min.css'))
    .pipe(gulp.dest(dsts.css));
  cb();
}));

gulp.task('ejs', function (cb) {
  return gulp.src([srcs.ejs + '**/*.html', '!' + srcs.ejs + '**/_*.html'])
    .pipe(ejs({}))
    .pipe(ext_replace('.html'))
    .pipe(gulp.dest(dsts.ejs));
  cb();
});

gulp.task('copy', function (cb) {

  gulp.src([srcs.lib + '**'])
    .pipe(gulp.dest(dsts.lib));

  gulp.src([srcs.images + '**'])
    .pipe(gulp.dest(dsts.images));

  gulp.src([srcs.css + '**/*.css'])
    .pipe(gulp.dest(dsts.css));

  cb();
});

gulp.task('watch', function (cb) {
  gulp.watch(srcs.ejs + '**/*.ejs', gulp.series('ejs'));
  gulp.watch(srcs.js + '**/*.js', gulp.series('js'));
  gulp.watch(srcs.less + '**/*.less', gulp.series('less'));
  gulp.watch(srcs.css + '**/*.css', gulp.series('copy'));
});

gulp.task('server', function () {
  connect.server({
    root: dsts.root, //根目录
    // ip:'192.168.11.62',//默认localhost:8080
    livereload: true,//自动更新
    port: cfg.port//端口
  });
});

gulp.task("default", gulp.parallel('server', 'watch'));
gulp.task("build", gulp.parallel(['uglify', 'cssmin', 'copy', 'ejs']));