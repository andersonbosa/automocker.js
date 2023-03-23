
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const paths = require('./paths.js')

// const banner = `
// /*********************
//  * THIS IS THE BANNER!
//  ********************/
// `

module.exports = {
  entry: paths.src.concat('/main.mjs'),

  output: {
    path: paths.build
  },

  module: {
    rules: [
      {
        parser: undefined,
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ]
  },

  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // ...
    // new webpack.BannerPlugin({
    //   banner,
    //   entryOnly: true
    // }),

    // ...
    new webpack.EnvironmentPlugin({
      DEBUG: process.env.NODE_ENV === 'development',
      NODE_ENV: process.env.NODE_ENV
    })
  ],

  resolve: {
    modules: [
      'node_modules',
      'src'
    ]
  }
}