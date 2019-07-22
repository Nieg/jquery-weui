var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
var less = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var ejs = require("gulp-ejs");
var uglify = require('gulp-uglify');
var ext_replace = require('gulp-ext-replace');
var cssmin = require('gulp-cssmin');

var pkg = require("./package.json");

var banner = 
"/** \n\
* jQuery WeUI V" + pkg.version + " \n\
* By 言川\n\
* http://lihongxun945.github.io/jquery-weui/\n \
*/\n";

gulp.task('js', function(cb) {

  count = 0;
  var end = function(){
    count ++;
    if(count >= 3) cb();
  };

  gulp.src([
    './src/js/city-data.js',
    './src/js/city-picker.js'
  ])
    .pipe(concat({ path: 'city-picker.js'}))
    .pipe(gulp.dest('./dist/js/'))
    .on("end", end);

  gulp.src([
    './src/js/swiper.jquery.js',
    './src/js/swiper-wrap.js',
    './src/js/photos.js'
  ])
    .pipe(concat({ path: 'swiper-ex.js'}))
    .pipe(gulp.dest('./dist/js/'))
    .on("end", end);

  gulp.src([
    './src/js/jquery-extend.js',
    './src/js/template7.js',
    './src/js/hammer.js',
    './src/js/modal.js',
    './src/js/toast.js',
    './src/js/action.js',
    './src/js/pull-to-refresh.js',
    './src/js/infinite.js',
    './src/js/tab.js',
    './src/js/search-bar.js',
    './src/js/device.js',
    './src/js/picker.js',
    './src/js/selectEx.js',
    './src/js/calendar.js',
    './src/js/datetime-picker.js',
    './src/js/popup.js',
    './src/js/notification.js',
    './src/js/toptip.js',
    './src/js/slider.js',
    './src/js/swipeout.js'
  ])
    .pipe(concat({ path: 'jquery-weui.js'}))
    .pipe(header(banner))
    .pipe(gulp.dest('./dist/js/'))
    .on("end", end);

  
});

gulp.task('uglify', gulp.series( "js", function(cb) {
  return gulp.src(['./dist/js/*.js', '!./dist/js/*.min.js'])
    .pipe(uglify({
      preserveComments: "license"
    }))
    .pipe(ext_replace('.min.js'))
    .pipe(gulp.dest('./dist/js'));
    cb();
}));

gulp.task('less', function (cb) {
  return gulp.src(['./src/less/jquery-weui.less'])
  .pipe(less({javascriptEnabled: true}))
  .pipe(autoprefixer())
  .pipe(header(banner))
  .pipe(gulp.dest('./dist/css/'));
});

gulp.task('cssmin', gulp.series("less", function (cb) {
  gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css'])
    .pipe(cssmin())
    .pipe(header(banner))
    .pipe(ext_replace('.min.css'))
    .pipe(gulp.dest('./dist/css/'));
    cb();
}));

gulp.task('ejs', function (cb) {
  return gulp.src(["./demos/*.html", "!./demos/_*.html"])
    .pipe(ejs({}))
    .pipe(gulp.dest("./dist/demos/"));
    cb();
});

gulp.task('copy', function(cb) {
  gulp.src(['./src/lib/**/*'])
    .pipe(gulp.dest('./dist/lib/'));

  gulp.src(['./demos/images/*.*'])
    .pipe(gulp.dest('./dist/demos/images/'));

  gulp.src(['./demos/css/*.css'])
    .pipe(gulp.dest('./dist/demos/css/'));
    cb();
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/less/**/*.less',gulp.series('less'));
  gulp.watch('demos/*.html', gulp.series('ejs'));
  gulp.watch('demos/css/*.css', gulp.series('copy'));
});


gulp.task('server', function(){
  connect.server({
    //root:'cug_vatti_Backpass',//根目录
    // ip:'192.168.11.62',//默认localhost:8080
    livereload:true,//自动更新
    port:9909//端口
  })
});

gulp.task("default", gulp.parallel(['server','watch']));
gulp.task("build",gulp.parallel(['uglify', 'cssmin', 'copy', 'ejs']));
