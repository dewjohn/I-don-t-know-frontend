const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'builder.js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [
    new htmlWebpackPlugin()
  ]
}