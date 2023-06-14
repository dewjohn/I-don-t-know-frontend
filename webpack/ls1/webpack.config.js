const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: 'development',
	entry: {
		index: {
			import: './src/index.js',
		},
		main: {
			import: './src/main.js',
		},
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name]-builder.js',
		clean: true,
	},
	plugins: [new htmlWebpackPlugin()],
}
