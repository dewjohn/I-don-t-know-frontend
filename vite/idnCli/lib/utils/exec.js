const { spawn } = require('child_process')

function exec(...args) {
	return new Promise((resolve, reject) => {
		// 1.开启子进程
		const childProcess = spawn(...args)
		// 2. 获取子进程的输出和错误信息
		childProcess.stdout.pipe(process.stdout)
		childProcess.stderr.pipe(process.stderr)
		// 3. 监听子进程的关闭
		childProcess.on('close', () => {
			resolve()
		})
	})
}

module.exports = exec
