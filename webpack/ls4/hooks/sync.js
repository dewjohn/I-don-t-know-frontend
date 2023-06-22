const { SyncHook } = require('tapable')

class MyComplier {
	constructor() {
		// 1. 创建hooks
		this.hooks = {
			syncHook: new SyncHook(['name', 'age']),
		}

		// 2. 用hooks监听事件
		this.hooks.syncHook.tap('event1', (name, age) => {
			console.log('event1的事件监听执行了', name, age)
		})
		this.hooks.syncHook.tap('event2', (name, age) => {
			console.log('event2的事件监听执行了', name, age)
		})
	}
}

const myComplier = new MyComplier()

// 激活事件
myComplier.hooks.syncHook.call('ls4', 18)

// event1的事件监听执行了 ls4 18
// event2的事件监听执行了 ls4 18
