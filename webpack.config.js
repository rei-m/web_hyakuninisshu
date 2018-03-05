const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',

  mode: 'development',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        include: [
          path.join(
            __dirname,
            'css',
            'style.css'
          ),
          path.join(
            __dirname,
            'node_modules',
            'normalize.css',
            'normalize.css'
          ),
          path.join(
            __dirname,
            'node_modules',
            '@blueprintjs',
            'core',
            'lib',
            'css',
            'blueprint.css'
          ),
          path.join(
            __dirname,
            'node_modules',
            '@blueprintjs',
            'icons',
            'lib',
            'css',
            'blueprint-icons.css'
          ),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'images/[name]-[hash].[ext]',
          publicPath: '/dist/',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]',
          limit: 1
        }
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css'
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true
  }
};
