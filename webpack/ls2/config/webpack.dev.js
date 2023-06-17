const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: 'development',
	// 排除某些包不进行打包
	externals: {
		react: 'React',
		axios: 'axios',
	},
	devServer: {
		static: path.resolve(__dirname, '../dist'),
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
}
