const { program } = require('commander')

function helpOptions() {
	// 处理version
	program.version(require('../../package.json').version, '-v --version')

	// 增强其他options操作
	program.option('-t --test', 'test option')

	// 获取额外参数
	program.option('-n --name <name>', 'name option')


}

module.exports = helpOptions
