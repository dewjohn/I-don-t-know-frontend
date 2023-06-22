const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: 'development',
	devtool: false,
	entry: './src/main.js',
	output: {
		clean: true,
		path: path.resolve(__dirname, './build'),
		filename: 'js/[name]-[contenthash:6].js',
	},
	resolveLoader: {
		modules: ['node_modules', './customLoader'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					'firstLoader',
					{
						loader: 'secondLoader',
						options: {
							name: 'secondLoader',
							author: 'john',
						},
					},
				],
			},
			{
				test: /\.md$/,
				use: ['markdownLoader'],
			},
		],
	},
	plugins: [new htmlWebpackPlugin()],
}
