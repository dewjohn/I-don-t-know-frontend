const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TeserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const compressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

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
		// 对css进行tree-shaking
		new PurgeCSSPlugin({
			paths: glob.sync(path.dirname(__dirname) + '/src/**/*', { nodir: true }), // src下的所有文件
		}),
		// 作用于提升打包速度
		new webpack.optimize.ModuleConcatenationPlugin(),
		// 开启gzip压缩
		new compressionWebpackPlugin({
			test: /\.(js|css|html|svg)$/,
			minRatio: 0.8, // 压缩比例
			algorithm: 'gzip',
		}),
	],
}
