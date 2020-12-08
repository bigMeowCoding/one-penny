const HtmlWebpackPlugin = require("html-webpack-plugin"),
  config = require("./webpack.config");
const plugins = config.plugins || [];
module.exports = Object.assign({}, config, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: [
          /node_modules\/(?!(my_main_package\/what_i_need_to_include)\/).*/,
          /__test__/,
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
      },
    ],
  },
  devServer: {
    open: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
});
