const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  // devtool: 'source-map',
  // resolveLoader: {
  //   moduleExtensions: ['-loader']
  // },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // externals: [{ lodash: '_' }],
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2016', 'react', 'stage-0']
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    compress: true,
    historyApiFallback: true,
    port: 9999
  },
  optimization: {
    splitChunks: {
      chunks: 'initial'
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new Dotenv({
      path: './.env' // Path to .env file (this is the default)
    }),
    // new CopyWebpackPlugin([{ from: 'public', to: 'public' }]),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL)
    }),
    new CleanWebpackPlugin('dist'),
    new DynamicCdnWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
};
