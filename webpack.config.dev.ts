import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from './webpack.config';
const plugins = config.plugins || [];
export default Object.assign({}, config, {
  mode: 'development',
  devServer: {
    open: true,
  },
  devtool: 'eval-source-map',
  entry: {
    example: './example/example.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: './example/example.html',
    }),
  ],
});
