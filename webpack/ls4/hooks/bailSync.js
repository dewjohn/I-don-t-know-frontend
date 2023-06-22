const { SyncBailHook } = require('tapable') // bail：当有返回值时，就不会执行后续的事件触发了

class MyComplier {
	constructor() {
		// 1. 创建hooks
		this.hooks = {
			bailHook: new SyncBailHook(['name', 'age']),
		}

		// 2. 用hooks监听事件
		this.hooks.bailHook.tap('event1', (name, age) => {
			console.log('event1的事件监听执行了', name, age)
			return '我是event1的返回值,有返回值，就会阻断后续事件的执行'
		})
		this.hooks.bailHook.tap('event2', (name, age) => {
			console.log('event2的事件监听执行了', name, age)
		})
	}
}

const myComplier = new MyComplier()

// 激活事件
setTimeout(() => {
	myComplier.hooks.bailHook.call('ls4', 18)
}, 2000)

// event1的事件监听执行了 ls4 18
