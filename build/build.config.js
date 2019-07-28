var path = require('path')
var pkg = require("../package.json");
var joinPath = require('./joinPath');

var cfg = {
  banner: "/** \n\
  * jQuery WeUI V" + pkg.version + " \n\
  * By 言川\n\
  * http://lihongxun945.github.io/jquery-weui/\n \
  */\n",
  port: 9909,
  paths: {
    srcs: { root: './src/' },
    dsts: { root: './dist/' }
  },
  jsConcats: [
    {
      dst: 'jquery-weui.js',
      srcs: ['jquery-extend.js',
        'template7.js',
        'hammer.js',
        'modal.js',
        'toast.js',
        'action.js',
        'pull-to-refresh.js',
        'infinite.js',
        'tab.js',
        'search-bar.js',
        'device.js',
        'picker.js',
        'selectEx.js',
        'calendar.js',
        'datetime-picker.js',
        'popup.js',
        'notification.js',
        'toptip.js',
        'slider.js',
        'swipeout.js']
    }, {
      dst: 'swiper-ex.js',
      srcs: ['swiper.jquery.js',
        'swiper-wrap.js',
        'photos.js']
    }, {
      dst: 'city-picker.js',
      srcs: [
        'city-data.js',
        'city-picker.js'
      ]
    }
  ]
};

var paths = {
  css: { src: './demos/css/', dst: 'demos/css/' },
  less: { src: 'less/', dst: 'css/' },
  js: { src: 'js', dst: 'js' },
  lib: { src: 'lib/', dst: 'lib/' },
  images: { src: './demos/images/', dst: 'demos/images/' },
  ejs: { src: './demos/ejs/', dst: 'demos/' }
};


for (var p in paths) {
  cfg.paths.srcs[p] = joinPath(cfg.paths.srcs.root, paths[p].src);
  cfg.paths.dsts[p] = joinPath(cfg.paths.dsts.root, paths[p].dst);
}

// console.log(cfg);
module.exports = cfg;

