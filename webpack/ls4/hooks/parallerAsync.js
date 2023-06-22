const { AsyncParallelHook } = require('tapable') // 并行，不会等到上一个事件回调执行结束，才执行下一次事件处理回调

class MyComplier {
	constructor() {
		// 1. 创建hooks
		this.hooks = {
			parallelHook: new AsyncParallelHook(['name', 'age']),
		}

		// 2. 用hooks监听事件
		this.hooks.parallelHook.tapAsync('event1', (name, age) => {
			setTimeout(() => {
				console.log('event1的事件监听执行了', name, age)
			}, 2000)
		})
		this.hooks.parallelHook.tapAsync('event2', (name, age) => {
			console.log('event2的事件监听执行了', name, age)
		})
	}
}

const myComplier = new MyComplier()

// 激活事件
myComplier.hooks.parallelHook.callAsync('ls4', 18)
