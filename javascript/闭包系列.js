// ex1
// function Circle(r) {
// 	this.r = r;
// }

// Circle.PI = 3.14159;

// Circle.prototype.area = function () {
// 	return Circle.PI * this.r * this.r;
// };

// let c = new Circle(1);

// console.log(c.area());

// ex2
// let Circle = function () {
// 	let obj = new Object();
// 	obj.PI = 3.14159;
// 	obj.area = function (r) {
// 		return this.PI * r * r;
// 	};
// 	return obj;
// };

// let c = new Circle();
// console.log(c.area(1));

// ex3
// let Circle = new Object();
// Circle.PI = 3.14159;
// Circle.area = function (r) {
// 	return this.PI * r * r;
// };

// console.log(Circle.area(1));

// ex4
// const Circle = {
// 	PI: 3.14159,
// 	area: function (r) {
// 		return this.PI * r * r;
// 	},
// };

// console.log(Circle.area(1));

// ex5
// const Circle = new Function(
// 	'this.PI = 3.14159;this.area = function(r) { return this.PI * r * r }'
// );

// console.log(new Circle().area(1));

// 解决作用域问题
// function f1() {
// 	let n = 1;
// 	test = function () {
// 		n += 1;
// 	};
// 	function f2() {
// 		console.log('f2()', n);
// 	}
// 	return f2;
// }
// let res = f1();
// res();
// test();
// res();
// res();

// 实现get和set
// let setVal, getVal;

// (function () {
// 	let n = 0;
// 	getVal = function () {
// 		return n;
// 	};
// 	setVal = function (val) {
// 		n = val;
// 	};
// })();

// // console.log(n);
// console.log(getVal());
// setVal(567);
// console.log(getVal());

// 闭包实现迭代器
// function test(x) {
// 	let i = 0;
// 	return function () {
// 		return x[i++];
// 	};
// }

// var next = test(['a', 'b', 'c', 'd']);

// console.log(next());
// console.log(next());
// console.log(next());
// console.log(next());

// 错误示例
// function f() {
// 	var a = [];
// 	var i;
// 	for (i = 0; i < 3; i++) {
// 		a[i] = function () {
// 			return i;
// 		};
// 	}
// 	return a;
// }

// var test = f();
// console.log(test[0]());
// console.log(test[1]());
// console.log(test[2]());

// 解决办法 1
// function f() {
// 	var a = [];
// 	var i;
// 	for (i = 0; i < 3; i++) {
// 		a[i] = (function (a) {
// 			return function () {
// 				return a;
// 			};
// 		})(i);
// 	}
// 	return a;
// }

// var test = f();
// console.log(test[0]());
// console.log(test[1]());
// console.log(test[2]());

// 解决办法 2
// function f() {
// 	var a = [];
// 	for (let i = 0; i < 3; i++) {
// 		a[i] = function () {
// 			return i;
// 		};
// 	}
// 	return a;
// }

// var test = f();
// console.log(test[0]());
// console.log(test[1]());
// console.log(test[2]());

// var dom = function () {};

// dom.Show = function () {
// 	console.warn('Show Message', this);
// };

// dom.prototype.Display = function () {
// 	console.warn('Property Message', this);
// };

// // dom.Display(); //error
// dom.Show(); // 不使用 prototype 属性定义的对象方法是静态方法，只能直接通过类名进行调用，此静态方法中无法使用this变量来调用对象其他的属性
// var d = new dom();
// d.Display(); // 使用 prototype 属性定义的对象方法是非静态方法，只能实例化之后才能使用，其方法内部可以使用this引用对象自身的其他属性
// // d.Show(); //error

// var dom = function () {
// 	var aaa = 'Default';
// 	this.Sex = 'Boy';
// 	this.success = function () {
// 		alert('Success');
// 	};
// };
// debugger
// alert(dom.aaa);
// alert(dom.Sex);

var person = (function () {
	//变量作用域为函数内部，外部无法访问
	var name = 'default';

	return {
		getName: function () {
			return name;
		},
		setName: function (newName) {
			name = newName;
		},
	};
})();

console.log(person.name); //直接访问，结果为undefined
console.log(person.getName());
person.setName('abruzzi');
console.log(person.getName());
