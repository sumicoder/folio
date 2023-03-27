//common
const gulp = require("gulp"); //gulp本体
const filter = require("gulp-filter"); //ファイルフィルター
const named = require("vinyl-named");
const debug = require("gulp-debug");
const path = require("path");

//scss
const sass = require("gulp-dart-sass"); //Dart Sass はSass公式が推奨 @use構文などが使える
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const browserSync = require("browser-sync"); //ブラウザリロード
const autoprefixer = require("gulp-autoprefixer"); //ベンダープレフィックス自動付与
const gcmq = require("gulp-group-css-media-queries"); //メディアクエリを一つにまとめる
const sassGlob = require('gulp-sass-glob-use-forward');//dartSassでglob使う
const sourcemaps = require("gulp-sourcemaps");

//img
const webp = require('gulp-webp');//webpに変換

// 入出力するフォルダを指定
const baseRoot = './public_html';
const srcBase = './src';
const distBase = './public_html/assets';

const srcPath = {
  'scss': srcBase + '/scss/**/*.scss',
  'html': baseRoot + '/**/*.html',
  'img': srcBase + '/images/**/*.*',
};

const distPath = {
  'css': distBase + '/css/',
  'html': baseRoot + '/',
  'img': distBase + "/images/",
  'js': distBase + '/js/*.js',
};

const TARGET_BROWSERS = [
  'last 2 versions',//各ブラウザの2世代前までのバージョンを担保
  'ie >= 11'//IE11を担保
];

/**
 * sass
 *
 */
const cssSass = () => {
  return gulp.src(srcPath.scss, {
    sourcemaps: true
  })
  .pipe(
    //エラーが出ても処理を止めない
    plumber({
      errorHandler: notify.onError('Error:<%= error.message %>')
    }))
  .pipe(sass({ outputStyle: 'expanded' })) //指定できるキー expanded compressed
  .pipe(gcmq())
  .pipe(sassGlob())
  .pipe(autoprefixer(TARGET_BROWSERS))// ベンダープレフィックス自動付与
  .pipe(gulp.dest(distPath.css, { sourcemaps: './' })) //コンパイル先
  .pipe(browserSync.stream())
  .pipe(notify({
    // message: 'Sassをコンパイルしました！',
    onLast: true
  }))
}

/**
 * html
 */
const html = () => {
  return gulp.src(srcPath.html)
    .pipe(gulp.dest(distPath.html))
}

/**
 * img
 */
const imageWebp = () => {
  return gulp
  .src(srcBase+'/images/**/*.+(jpg|jpeg|png)')
  .pipe(webp())
  .pipe(gulp.dest(distPath.img));
}

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}

const browserSyncOption = {
  // proxy: "xxx.local",       // ローカルにある「Site Domain」に合わせる 拡張子wpにすると気持ち程度読み込み早くなるような気がする...by りょーすけ
  // notify: false,                  // ブラウザ更新時に出てくる通知を非表示にする
  // open: "external",               // ローカルIPアドレスでサーバを立ち上げる
  server : {
    baseDir : './public_html',
    index : ['index.html','company.html'],
  },
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false,
  },
}

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

/**
 *
 * ファイル監視 ファイルの変更を検知したら、browserSyncReloadでreloadメソッドを呼び出す
 * series 順番に実行
 * watch('監視するファイル',処理)
 */
const watchFiles = () => {
  gulp.watch(srcPath.scss, gulp.series(cssSass))
  gulp.watch(srcPath.img, gulp.series(imageWebp,browserSyncReload));
  gulp.watch(srcPath.html, gulp.series(browserSyncReload))
  gulp.watch(distPath.js, gulp.series(browserSyncReload))
}

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */
// npx gulpで起動
exports.default = gulp.series(
  gulp.parallel(html,  cssSass,imageWebp),
  gulp.parallel(watchFiles, browserSyncFunc)
);