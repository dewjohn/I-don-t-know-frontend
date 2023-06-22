const { SyncLoopHook } = require('tapable') // 返回值为true，就会反复执行该事件，当返回值为undefined或者不发返回内容，就退出事件

class MyComplier {
	constructor() {
		// 1. 创建hooks
		this.hooks = {
			loopHook: new SyncLoopHook(['name', 'age']),
		}

		// 2. 用hooks监听事件
		this.hooks.loopHook.tap('event1', (name, age) => {
			console.log('event1的事件监听执行了', name, age)
			return '我是event1的返回值,有返回值，就会阻断后续事件的执行'
		})
		this.hooks.loopHook.tap('event2', (name, age) => {
			console.log('event2的事件监听执行了', name, age)
		})
	}
}

const myComplier = new MyComplier()

// 激活事件
setTimeout(() => {
	myComplier.hooks.loopHook.call('ls4', 18)
}, 2000)
