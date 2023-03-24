const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths.js')

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  output: {
    path: paths.build,
    filename: 'bundle.js'
  },

  devServer: {
    static: [
      paths.build
    ],
    compress: true,
    port: 9000,
    open: true
  },

  plugins: [
    // https://github.com/jantimon/html-webpack-plugin#options
    new HtmlWebpackPlugin({
      title: "Automocker.js",
      favicon: paths.public + '/assets/images/favicon.svg',
      template: paths.src + '/assets/template.html',
      filename: 'index.html',
    })
  ]
}