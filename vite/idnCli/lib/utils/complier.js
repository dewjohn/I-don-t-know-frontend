const path = require('path')
const ejs = require('ejs')

function complierEjs(name, data) {
	return new Promise((resolve, reject) => {
		// 1. 获取当前模板的路径
		const templatePath = path.resolve(__dirname, `../../template/${name}`)

		// 2. 使用ejs引擎编译模板
		ejs.renderFile(templatePath, data, (err, result) => {
			if (err) {
				console.log('ejs compile error', err)
				reject(err)
			}
			resolve(result)
		})
	})
}

module.exports = complierEjs
