const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");//圧縮用

module.exports = {
  mode: "development",
  //entry: '', // gulpで設定
  output: {
    filename: "[name].js",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            compact: false,
          },
        },
      },
    ],
  },
  plugins: [
    // ファイルを分割しない
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    minimize: true, // ファイル圧縮機能を有効にする
    minimizer: [
      new TerserPlugin({
        extractComments: false, // コメント文を出力させない
        terserOptions: {
          compress: {
            drop_console: false, // console.logを残す
          },
        },
      }),
    ],
  },
  performance: {
    hints: false, // パフォーマンス警告を表示しない
  },
  resolve: {
    extensions: [".js"],
  },
};
