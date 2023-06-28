const { promisify } = require('util')
const { program } = require('commander')
const complierEjs = require('../utils/complier')
const writeFile = require('../utils/writeFile')
const download = promisify(require('download-git-repo'))

async function createProjectAction(project) {
	try {
		await download(
			'direct:https://gitee.com/panjiachen/vue-admin-template.git#master',
			project,
			{ clone: true }
		)
		// 提示
		console.log(`cd ${project}`)
		console.log(`pnpm install`)
		console.log(`pnpm run dev`)
		// console.log(process.platform)
		// 或者直接帮助用户安装依赖
		// await exec('npm.cmd', ['install'], { cwd: `./${project}` })
		// await exec('npm.cmd', ['run', 'dev'], { cwd: `./${project}` })
	} catch (error) {
		console.log('git clone error', error)
	}
}

async function addVueTemplateAction(name) {
	console.log('添加vue模板', name)
	// 1. 编译ejs模板
	const template = await complierEjs('component.vue.ejs', { name })
	// 2. 写入文件
	// 写入指定路径中
	const dest = program.opts().dest || 'src/components'
	console.log(program.opts().dest, '指令')
	await writeFile(`${dest}/${name}.vue`, template)
	console.log('add component template success', `${name}.vue`)
}

module.exports = {
	createProjectAction,
	addVueTemplateAction,
}
