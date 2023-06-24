// 没有打包lodash是因为rollup默认只支持ES6模块，而lodash是commonjs模块，所以需要配置
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')

module.exports = {
	input: './lib/index.js',
	output: [
		{
			format: 'umd', // 要打包的格式
			name: 'ls1', //  umd要指定name，这样使用时才能用这个全局名字调用
			file: './build/ls1.umd.js', // 位置
			globals: {
				lodash: '_',
			},
		},
	],
	external: ['lodash'], // 不打包lodash，而是使用外部的lodash
	plugins: [
		commonjs(), // 用于打包commonjs模块
		nodeResolve(), // 用于打包node_modules里的模块
		babel({
			babelHelpers: 'bundled', // 用于打包ES6模块
			exclude: 'node_modules/**', // 排除node_modules里的模块
		}), // 用于打包ES6模块
		terser(), // 用于压缩代码
	],
}
