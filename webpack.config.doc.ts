import config from './webpack.config';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const plugins = config.plugins || [];

module.exports = Object.assign({}, config, {
  mode: 'production',
  entry: {
    example: './example/example.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'doc'),
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: './example/example.html',
      filename: 'example.html',
    }),
  ],
});
