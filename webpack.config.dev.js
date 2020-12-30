const HtmlWebpackPlugin = require("html-webpack-plugin"),
  config = require("./webpack.config");
const plugins = config.plugins || [];
module.exports = Object.assign({}, config, {
  mode: "development",
  devServer: {
    open: true,
  },
  devtool: 'eval-source-map',
  entry: {
    example: "./example/example.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: "./example/example.html",
    }),
  ],
});
