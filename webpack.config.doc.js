const config = require("./webpack.config"),
  path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  plugins = config.plugins || [];

module.exports = Object.assign({}, config, {
  mode: "production",
  entry: {
    example: "./example/example.tsx",
  },
  output: {
    path: path.resolve(__dirname, "doc"),
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: "./example/example.html",
      filename: "example.html",
    }),
  ],
});
