const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: './',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader?modules!less-loader'
    }, {
      test: /\.js$/,
      loader: require.resolve('babel-loader'),
      exclude: /node_modules/,
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV
      }
    })
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0'
  }
}
