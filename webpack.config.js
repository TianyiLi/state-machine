const path = require('path')
const webpack = require('webpack')
/** @type {import('webpack').WebpackOptions} */
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ])
  ]
}