const { validate } = require('schema-utils')
const schema = require('./schema/secondLoaderSchema.json')

module.exports = function (content, map, meta) {
	// 获取传递给loader的参数
	// 早期版本的webpack使用loader-utils获取参数
	// 目前可以通过this.getOptions()获取参数
	const options = this.getOptions()

	// 校验参数
	validate(schema, options)
	console.log(options)
	return content.replace('world', '世界')
}
