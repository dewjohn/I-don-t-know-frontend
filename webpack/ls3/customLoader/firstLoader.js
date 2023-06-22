/**
 * 第一个自定义loader
 * content: 读取到的文件内容
 * map: 文件的sourceMap
 * meta: 其他信息
 */
module.exports = function (content, map, meta) {
	/**
	 * 异步loader
	 */
	const callback = this.async()

	setTimeout(() => {
		callback(null, content.replace('hello', '你好'))
	}, 2000)
}
