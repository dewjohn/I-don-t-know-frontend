const { NodeSSH } = require('node-ssh')

class AutoUploadWebpackPlugin {
	constructor(options) {
		this.ssh = new NodeSSH()
		this.options = options
	}
	apply(complier) {
		console.log('AutoUploadWebpackPlugin被注册')
		// 完成的事情：注册hooks监听事件
		// 等到webpack将打包好的静态资源输出后
		complier.hooks.afterEmit.tapAsync(
			'Upload',
			async (compilation, callback) => {
				console.log('资源上传中...')
				// 1. 获取输出文件夹路径(获取文件)
				const outputPath = compilation.options.output.path
				console.log('路径', outputPath)
				// 2. 上传服务器
				// 连接服务器
				await this.connect()
				// 删除上一次上传文件
				const remotePath = this.options.remotePath
				this.ssh.execCommand(`rm -rf ${remotePath}`)
				// 上传服务器
				await this.uploadFile(outputPath, remotePath)
				// 关闭连接
				this.ssh.dispose()

				console.log('资源上传完成')
				callback()
			}
		)
	}

	async connect() {
		await this.ssh.connect({
			host: this.options.host || 'localhost',
			username: this.options.username || 'root',
			password: this.options.password,
		})
	}

	async uploadFile(localPath, remotePath) {
		const stat = await this.ssh.putDirectory(localPath, remotePath, {
			recursive: true,
			concurrency: 10,
		})
		if (stat) {
			console.log('上传成功')
		}
	}
}

module.exports = AutoUploadWebpackPlugin
