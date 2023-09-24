Array.prototype.reduce = function reduce(callbackFn, initialValue) {
	if (typeof callbackFn !== 'function')
		throw new TypeError('callbackFn is not a function');
	var self = this;
	let result = initialValue;
	let index = 0;
	if (typeof initialValue === 'undefined') {
		result = self[0];
		index = 1;
	}
	for (; index < self.length; index++) {
		result = callbackFn(result, self[index], index);
	}
	return result;
};

let arr = [1, 2, 3, 4, 5];
let res = arr.reduce((acc, cur) => acc + cur);
console.log(res);
