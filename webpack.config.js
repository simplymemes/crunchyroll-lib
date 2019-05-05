const path = require('path')
    , webpack = require('webpack')
    , UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'crunchyroll-lib.umd': './src/index.ts',
    'crunchyroll-lib.umd.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'CrunchyrollLib',
    umdNamedDefine: true,
    globalObject: 'this'
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
