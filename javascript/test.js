// const coefficient = function coefficient(num) {
// 	num = num + ''
// 	const [, char = ''] = num.split('.')
// 	const length = char.length
// 	return Math.pow(10, length) // 10**length
// }

// const plus = function plus(num1, num2) {
// 	if (isNaN(num1) || isNaN(num2)) return NaN
// 	let max = Math.max(coefficient(num1), coefficient(num2))
// 	return (num1 * max + num2 * max) / max
// }

// console.log(plus(0.234, 0.1))

// var a = {
// 	i: 0,
// 	[Symbol.toPrimitive]() {
// 		return ++this.i
// 	},
// 	toString() {
// 		return ++this.i
// 	},
// 	valueOf() {
// 		return ++this.i
// 	},
// }
// let i = 0
// Object.defineProperty(window, 'a', {
// 	get() {
// 		return ++i
// 	},
// })
// if (a == 1 && a == 2 && a == 3) {
// 	console.log('ok')
// }

console.log(a)
if (!('a' in window)) {
	var a = 'hello'
}

console.log(a)
