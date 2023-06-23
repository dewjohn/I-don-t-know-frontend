const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const autoUploadWebpackPlugin = require('./plugins/autoUploadWebpackPlugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: 'development',
	devtool: false,
	entry: './src/index.js',
	output: {
		clean: true,
		path: path.resolve(__dirname, './build'),
		filename: 'js/[name]-[contenthash:6].js',
	},
	plugins: [
		new htmlWebpackPlugin(),
		new autoUploadWebpackPlugin({
			host: 'xxx.xxx.xxx.xxx',
			username: 'root',
			password: 'xxxxxx',
			remotePath: '/usr/local/nginx/html/',
		}),
	],
}
