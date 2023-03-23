const resolve = require('path').resolve

module.exports = {
  src: resolve(__dirname, '../src'),

  // Production build files
  build: resolve(__dirname, '../build'),

  // Static files that get copied to build folder
  public: resolve(__dirname, '../public'),
}
