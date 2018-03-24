const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle-[hash].js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle-[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname, 'public', 'index.html'),
      inject: true
    })
  ],
});
