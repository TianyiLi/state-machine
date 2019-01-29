const path = require('path')
const { ProvidePlugin } = require('webpack')
/** @type {import('webpack').WebpackOptions} */
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: require.resolve('./src/index.ts'),
        use: [
          {
            loader: 'expose-loader',
            options: 'StateMachine'
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: 'statemachine.js',
    path: path.resolve(__dirname, 'dist')
  }
}