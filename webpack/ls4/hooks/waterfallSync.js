const { SyncWaterfallHook } = require('tapable') // 返回值为true，就会反复执行该事件，当返回值为undefined或者不发返回内容，就退出事件

class MyComplier {
	constructor() {
		// 1. 创建hooks
		this.hooks = {
			waterfallHook: new SyncWaterfallHook(['name', 'age']),
		}

		// 2. 用hooks监听事件
		this.hooks.waterfallHook.tap('event1', (name, age) => {
			console.log('event1的事件监听执行了', name, age)
			return '我是event1的返回值,有返回值，就会传给下一个事件作为第一个参数'
		})
		this.hooks.waterfallHook.tap('event2', (name, age) => {
			console.log('event2的事件监听执行了', name, age)
		})
	}
}

const myComplier = new MyComplier()

// 激活事件
setTimeout(() => {
	myComplier.hooks.waterfallHook.call('ls4', 18)
}, 2000)

// event1的事件监听执行了 ls4 18
// event2的事件监听执行了 我是event1的返回值,有返回值，就会传给下一个事件作为第一个参数 18