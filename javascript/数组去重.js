// 数组去重
// 外层循环元素 内层循环时比较值如果相同则跳过，不相同则push进数组
Array.prototype.distinct = function () {
	let arr = this;
	let result = [];
	let length = arr.length;
	let i = 0;
	let j = 0;
	for (i = 0; i < length; i++) {
		for (j = i + 1; j < length; j++) {
			if (arr[i] === arr[j]) {
				j == ++i;
			}
		}
		result.push(arr[i]);
	}
	return result;
};

let arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1];
// console.log(arra.distinct()); //返回[3,4,2,1]

// 利用splice去重
// 双重循环 外层循环元素 内层循环时比较值
// 值相同时 则去掉这个值
// 删掉此元素应该数组的长度就要减去1
Array.prototype.distinct2 = function () {
	let arr = this;
	let length = arr.length;
	let i = 0,
		j = 0;
	for (i = 0; i < length; i++) {
		for (j = i + 1; j < length; j++) {
			if (arr[i] === arr[j]) {
				arr.splice(j, 1);
				length--;
				j--;
			}
		}
	}
	return arr;
};

let a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1];

// console.log(a.distinct2());

// 利用对象的属性不能重复的特性进行去重
Array.prototype.distinct3 = function () {
	let arr = this;
	let length = arr.length;
	let result = [];
	let obj = {};
	for (let i = 0; i < length; i++) {
		if (!obj[arr[i]]) {
			obj[arr[i]] = 1;
			result.push(arr[i]);
		}
	}
	return result;
};

let aa = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1];
// console.log(aa.distinct3());

// 数组递归去重
Array.prototype.distinct4 = function () {
	let arr = this;
	let length = arr.length;
	arr.sort((a, b) => a - b);
	function loop(index) {
		if (index >= 1) {
			if (arr[index] === arr[index - 1]) {
				arr.splice(index, 1);
			}
			loop(index - 1);
		}
	}
	loop(length - 1);
	return arr;
};

var aaa = [
	1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1, 56, 45, 56,
];

// console.log(aaa.distinct4());

// indexOf 配合 forEach 去重
// Array.prototype.distinct5 = function () {
// 	let arr = this;
// 	let result = [];
// 	arr.forEach((value) => {
// 		if (result.indexOf(value) === -1) {
// 			result.push(value);
// 		}
// 	});
// 	return result;
// };

Array.prototype.distinct5 = function () {
	let arr = this;
	let result = [];
	arr.forEach((value, index, arr) => {
		if (arr.indexOf(value, index + 1) === -1) {
			result.push(value);
		}
	});
	return result;
};

var aaaa = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2,
	2, 1, 23, 1, 23, 2, 3, 2, 3, 2, 3,
];
// console.log(aaaa.distinct5());

// 利用 es6 的 set

Array.prototype.distinct6 = function () {
	let arr = this;
	return Array.from(new Set(arr));
};

console.log(aaaa.distinct6());
