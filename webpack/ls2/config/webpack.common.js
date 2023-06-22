const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const BunderAnalyzerPlugin = require('webpack-bundle-analyzer')

/**
 * @type { import('webpack').Configuration }
 */
const commonConfig = {
	entry: {
		index: {
			import: './src/index.js',
		},
		main: {
			import: './src/main.js',
		},
	},
	output: {
		clean: true,
		path: path.resolve(__dirname, '../build'),
		filename: 'js/[name]-[contenthash:6].js',
		chunkFilename: 'js/[name]-chunk.js', // 单独对分包文件进行命名
	},
	// 排除某些包不进行打包
	externals: {
		react: 'React',
		axios: 'axios',
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './index.html',
			cache: true,
			minify: 'auto',
		}),
		new BunderAnalyzerPlugin.BundleAnalyzerPlugin(),
	],
}

module.exports = function (ENV) {
	const isDev = ENV.development
	const mergeConfig = isDev ? devConfig : prodConfig
	return merge(commonConfig, mergeConfig)
}
