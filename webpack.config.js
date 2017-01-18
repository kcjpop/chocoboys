const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nib = require('nib')

const SRC_FOLDER = path.resolve(__dirname, 'src')
const TARGET_FOLDER = path.resolve(__dirname, 'public/dist')

const config = {
  context: SRC_FOLDER,
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates,
    './index.es6'
  ],
  output: {
    path: TARGET_FOLDER,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: TARGET_FOLDER,
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },
  module: {
    rules: [
      { test: /blueimp-file-upload/, loader: 'imports-loader?define=>false' },
      { test: /jquery-mousewheel/, loader: 'imports-loader?define=>false' },
      { test: /\.(gif|jpg|jpeg|png)/, loader: 'url-loader' },
      { test: /\.(woff|woff2|svg|eot|ttf)/, loader: 'file-loader' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader!stylus-loader'
        })
      },
      {
        test: /\.es6$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.es6', '.js'],
    modules: [SRC_FOLDER, 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors/scripts',
      filename: 'vendors/scripts.js'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [nib()],
          import: ['~nib/lib/nib/index.styl']
        }
      }
    })
  ]
}

module.exports = config
