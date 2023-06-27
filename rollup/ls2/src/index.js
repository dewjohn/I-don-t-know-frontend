import { add, subtract } from './utils/math'
import { format } from './format/index'
import './style/index.css'

const foo = () => {
	console.log('foo')
}

function bar() {
	console.log('bar')
}

const baz = () => {
	return () => {
		console.log('first')
	}
}

console.log(add(123, 456))
console.log(subtract(456, 123))
// console.log(_.join(['a', 'b', 'c'], '~')) // 没有处理lodash是因为lodash在node_modules里，rollup默认只支持ES6模块，而lodash是commonjs模块，所以需要配置
console.log(format())


const titleEl = document.createElement('div')

titleEl.className = 'title'

titleEl.textContent = 'hello world'

document.body.append(titleEl)
