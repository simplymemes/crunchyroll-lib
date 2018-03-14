const path = require('path')
    , webpack = require('webpack')
    , UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'crunchyroll-lib': './src/index.ts',
    'crunchyroll-lib.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'CrunchyrollLib',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        include: /\.min\.js$/
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              declaration: false
            }
          }
        ]
      }
    ]
  }
};