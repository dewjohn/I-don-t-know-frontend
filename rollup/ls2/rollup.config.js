// 没有打包lodash是因为rollup默认只支持ES6模块，而lodash是commonjs模块，所以需要配置
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const server = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')

const env = process.env.NODE_ENV

console.log('当前环境是：', env)

const devPlugins = [
	server({
		port: 3002,
		open: true,
		contentBase: '.',
	}),
	livereload(),
]

const Plugins = [
	commonjs(), // 用于打包commonjs模块
	nodeResolve(), // 用于打包node_modules里的模块
	babel({
		babelHelpers: 'bundled', // 用于打包ES6模块
		exclude: 'node_modules/**', // 排除node_modules里的模块
	}), // 用于打包ES6模块
	terser(), // 用于压缩代码
	postcss(), // 用于打包css
]

if (env === 'development') {
	Plugins.push(...devPlugins)
}

module.exports = {
	input: './src/index.js',
	output: [
		{
			format: 'umd', // umd兼容amd和commonjs规范，可以在浏览器和node环境中使用
			name: 'ls2', //  umd要指定name，这样使用时才能用这个全局名字调用
			file: './build/ls2.js', // 位置
		},
	],
	plugins: Plugins,
}
