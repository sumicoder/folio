const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");//JSを圧縮するためのプラグイン

module.exports = {
  mode: "production",// 本番モード 不要なコードが削除される
  output: {
    filename: "[name].js",//出力されるファイル名の設定 [name]はエントリポイント名に置き換えられます。
  },
  // キャッシュ設定：変更の差分を見るためビルドが高速化します
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  // ローダーを設定する所(babel-loader css-loader file-loader url-loader)
  // ここでは、jsファイルに対してbabel-loaderを適用し、
  // @babel/preset-envプリセットを使用してトランスパイルしています。
  // 古いブラウザにも対応(IE)
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: [["@babel/preset-env"]],
  //           compact: true,//babelが生成するコードを短くする→ビルド時間を短くする
  //         },
  //       },
  //     },
  //   ],
  // },
  // 画像ファイルの最適化、HTMLファイルの生成、
  // バンドルされたファイルの分析などの様々なタスクに対応
  // しかしgulpが担っているので空欄で問題なし
  plugins: [
  ],
  // バンドルする際の最適化設定
  optimization: {
    minimize: true, // ファイル圧縮機能を有効にする
    minimizer: [
      // TerserPluginを使用
      new TerserPlugin({
        extractComments: false, // コメント文を出力させない
        terserOptions: {
          compress: {
            drop_console: true, // console.logを出力させない(=true)
          },
        },
      }),
    ],
  },
  // ビルドサイズが大きすぎる場合に警告を表示するための設定
  performance: {
    hints: false, // パフォーマンス警告を表示しない(基本的に莫大なサイズになることはないため)
  },
  // モジュールの読み込みに関する設定
  // require("webpack");などjsが省略されていても
  // .jsを優先的に検索して'.js'ファイルを読み込むことが可能
  resolve: {
    extensions: [".js"],
  },
};
