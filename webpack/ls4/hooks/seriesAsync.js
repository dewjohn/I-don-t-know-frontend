const { AsyncSeriesHook } = require('tapable') // series：串行，会等待上一个hook执行完毕

class MyComplier {
	constructor() {
		// 1. 创建hooks
		this.hooks = {
			serieslHook: new AsyncSeriesHook(['name', 'age']),
		}

		// 2. 用hooks监听事件
		this.hooks.serieslHook.tapAsync('event1', (name, age, callback) => {
			setTimeout(() => {
				console.log('event1的事件监听执行了', name, age)
				callback()
			}, 2000)
		})
		this.hooks.serieslHook.tapAsync('event2', (name, age, callback) => {
			console.log('event2的事件监听执行了', name, age)
			callback()
		})
	}
}

const myComplier = new MyComplier()

// 激活事件
myComplier.hooks.serieslHook.callAsync('ls4', 18, () => {
	console.log('所有任务执行完毕')
})


// event1的事件监听执行了 ls4 18
// event2的事件监听执行了 ls4 18
// 所有任务执行完毕