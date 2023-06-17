const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TeserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: 'production',
	// 排除某些包不进行打包
	optimization: {
		chunkIds: 'named', // 对分包进行命名
		splitChunks: {
			chunks: 'all',
			// 当一个包的大小大于指定大小，继续拆包
			maxSize: 20000,
			// 拆包拆成不小于指定大小的包
			minSize: 10,
			cacheGroups: {
				// 将node_modules中的包单独拆包
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					filename: 'vendor/[name]-vendors.js',
				},
				utils: {
					test: /[\\/]src[\\/]utils[\\/]/,
					filename: 'utils/[name]-utils.js',
				},
			},
		},
		minimize: true,
		minimizer: [
			new TeserWebpackPlugin({
				parallel: true,
				extractComments: true,
				terserOptions: {
					mangle: true,
				},
			}),
			new CssMinimizerPlugin(),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style/[name]-[contenthash:6].css',
		}),
	],
}