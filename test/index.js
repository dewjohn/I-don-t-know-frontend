// debugger
// console.log(foo)
// if (1 === 1) {
// 	console.log(foo)
// 	function foo() {}
// 	foo = 1
// 	console.log(foo)
// }

// console.log(foo)

// undefined
// f
// 1
// f

// f = function () {
// 	return true
// };
// g = function () {
// 	return false
// };

// (function () {
// 	if (g() && [] == ![]) {
// 		f = function () {
// 			return false
// 		}
// 		function g() {
// 			return true
// 		}
// 	}
// })();

// console.log(f());
// console.log(g());

// true
// true
// debugger
// var x = 3
// var obj = { x: 5 }
// obj.fn = (function () {
// 	this.x *= ++x
// 	return function (y) {
// 		this.x *= ++x + y
// 		console.log(x)
// 	}
// })()

// 匿名函数首先会执行一次 全局的 x = 3*4=12
// 执行obj.fn(6)
// this.x 指向的是obj的x  this.x = 5 * (13 + 6) = 95
// 输出13
//

// var fn = obj.fn
// obj.fn(6)
// fn(4)
// console.log(obj.x, x)
// 13
// 234
// 95 234

// let num = 0;
// (function fn() {
// 	if (num >= 5) return;
// 	num++;
// 	// 调用本函数（递归）arguments.callee() 获取的也是函数本身
// 	//arguments.callee();
// 	fn();
// })();

// console.log(num);

// for (var i = 0; i < 3; i++) {
// 	(function (i) {
// 		setTimeout(() => {
// 			console.log(i);
// 		}, i * 1000);
// 	})(i);
// }

// const fn = function (...args) {
// 	return (..._args) => {
// 		const param = args.concat(_args);
// 		return param.reduce((acc, cur) => acc + cur, 0);
// 	};
// };

// console.log(fn(1, 2, 3, 4, 5)(3, 5));

// const arr = [1, 2, 3, 4];

// let total = arr.reduce((acc, cur, index) => {
// 	console.log(console.log(acc, cur, index));
// 	return acc + cur;
// }, 0);

// console.log(total)
debugger
{
	function foo(a){}
	foo = 1
	function foo(b){}
	foo = 2
}
console.log(foo)