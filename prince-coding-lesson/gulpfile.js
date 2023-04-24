//common
const gulp = require("gulp"); //gulp本体
const debug = require("gulp-debug");//処理中のファイルをログ表示

//scss
const sass = require("gulp-dart-sass"); //Dart Sass はSass公式が推奨 @use構文などが使える
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const browserSync = require("browser-sync"); //ブラウザリロード
const autoprefixer = require("gulp-autoprefixer"); //ベンダープレフィックス自動付与
const gcmq = require("gulp-group-css-media-queries"); //メディアクエリを一つにまとめる
const sassGlob = require('gulp-sass-glob-use-forward');//dartSassでglob使う

//img
const webp = require('gulp-webp');//webpに変換

//JS
const webpack = require("webpack");
const webpackStream = require("webpack-stream");//webpackをgulpで使うためのもの
const webpackProd = require("./webpack.prod.js");//webpack本番モード用のファイル読み込み
const webpackDev = require("./webpack.dev.js");//webpack開発モード用のファイル読み込み
const named = require("vinyl-named");//gulpでwebpackのentryを自動作成
const filter = require("gulp-filter"); //_から始まるファイル名をコンパイル対象外にする
const path = require("path");

// 入出力するフォルダを指定
const baseRoot = './public_html';
const srcBase = './src';
const distBase = './public_html/assets';

const srcPath = {
  'scss': srcBase + '/scss/**/*.scss',
  'html': baseRoot + '/**/*.html',
  'js': srcBase + '/js/**/*.js',
  'img': srcBase + '/img/**/*.*'
};

const distPath = {
  'css': distBase + '/css/',
  'html': baseRoot + '/',
  'js': distBase + "/js/",
  'img': distBase + "/img/"
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
 * js
 */
function jsProd() {
  return gulp
    .src(srcPath.js)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      filter(function (file) {
        // _から始まるファイルを除外
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      })
    )
    .pipe(
      named((file) => {
        const p = path.parse(file.relative);
        return (p.dir ? p.dir + path.sep : "") + p.name;
      })
    )
    .pipe(webpackStream(webpackProd, webpack))
    .pipe(gulp.dest(distPath.js))
    .pipe(debug({ title: "js dist:" }));
}

function jsDev() {
  return gulp
    .src(srcPath.js)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      filter(function (file) {
        // _から始まるファイルを除外
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      })
    )
    .pipe(
      named((file) => {
        const p = path.parse(file.relative);
        return (p.dir ? p.dir + path.sep : "") + p.name;
      })
    )
    .pipe(webpackStream(webpackDev, webpack))
    .pipe(gulp.dest(distPath.js))
    .pipe(debug({ title: "js dist:" }));
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
  .src(srcBase+'/img/**/*.+(jpg|jpeg|png)')
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
  // proxy: "example.wp",// ローカルにある「Site Domain」に合わせる
  // notify: false,// ブラウザ更新時に出てくる通知を非表示にする
  // open: "external",// ローカルIPアドレスでサーバを立ち上げる
  server : {
    baseDir : './public_html',
    index : ['index.html'],
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
const watchFilesDev = () => {
  gulp.watch(srcPath.scss, gulp.series(cssSass))//Sassコンパイル
  gulp.watch(srcPath.js, gulp.series(jsDev,browserSyncReload));//JSコンパイル&画面リロード
  gulp.watch(srcPath.img, gulp.series(imageWebp,browserSyncReload));//Img圧縮
  gulp.watch(srcPath.html, gulp.series(browserSyncReload))//htmlファイルの変更検知
}
const watchFilesProd = () => {
  gulp.watch(srcPath.scss, gulp.series(cssSass))//Sassコンパイル
  gulp.watch(srcPath.js, gulp.series(jsProd,browserSyncReload));//JSコンパイル&画面リロード
  gulp.watch(srcPath.img, gulp.series(imageWebp,browserSyncReload));//Img圧縮
  gulp.watch(srcPath.html, gulp.series(browserSyncReload))//Sassコンパイル
}

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */

// npx gulp dev (development：開発モード)
exports.dev = gulp.series(
  gulp.parallel(html, jsDev, cssSass,imageWebp),//初回起動時のみ実行
  gulp.parallel(watchFilesDev, browserSyncFunc)//ファイル変更を検知するたび(watchFilesProd)に画面リロード(browserSyncFunc)
);
// npx gulp (defaults Prod：本番モード)
exports.default = gulp.series(
  gulp.parallel(html, jsProd, cssSass,imageWebp),//初回起動時のみ実行
  gulp.parallel(watchFilesProd, browserSyncFunc)//ファイル変更を検知するたび(watchFilesProd)に画面リロード(browserSyncFunc)
);