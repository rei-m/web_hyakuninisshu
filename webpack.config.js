const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { NODE_ENV } = process.env;

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin({
    filename: 'bundle.css'
  }),
  new CopyWebpackPlugin([
    {
      from: path.join(
        __dirname,
        'node_modules',
        'normalize.css',
        'normalize.css'
      ),
      to: './normalize.css',
      toType: 'file'
    }
  ])
];

if (NODE_ENV === 'development') {
  plugins.push(
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: false
    })
  );
}

module.exports = {
  entry: './src/index.tsx',

  mode: NODE_ENV,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets'),
    publicPath: '/assets/'
  },

  devtool: 'source-map',

  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'awesome-typescript-loader',
          {
            loader: path.resolve('lib/remove-data-test-attr-loader.js')
          }
        ]
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
          name: 'images/[name]-[hash].[ext]'
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
      {
        test: /\.json$/,
        loader: 'file-loader',
        query: {
          name: '[name]-[hash].[ext]'
        }
      }
    ]
  },

  plugins: plugins,

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true
  }
};
