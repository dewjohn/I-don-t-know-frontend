const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: 'production',
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
		path: path.resolve(__dirname, './build'),
		filename: 'js/[name]-[contenthash:6].js',
		chunkFilename: 'js/[name]-chunk.js', // 单独对分包文件进行命名
	},
	// 排除某些包不进行打包
	externals: {
		react: 'React',
		axios: 'axios',
	},
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
		new htmlWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style/[name]-[contenthash:6].css',
		}),
	],
}
