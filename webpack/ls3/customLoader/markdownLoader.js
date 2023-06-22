const { marked } = require('marked')

module.exports = function (content, map, meta) {
	const html = marked(content)
	// 返回的结果必须是模块化的内容
	const innerHtml = '`' + html + '`'
	const moduleContent = `var code = ${innerHtml}; export default code`
	return moduleContent
}
