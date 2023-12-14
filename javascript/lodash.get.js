// lodash.get 是一个获取任意深度嵌套对象的方法，即使中间的属性不存在时也不会引发错误

function get(object, path, defaultVal) {
	if (!object || !path) {
		return defaultVal;
	}
	let pathArray = path.split('.').filter(Boolean);
	let val = object;
	for (let i = 0; i < pathArray.length; i++) {
		let key = pathArray[i];
		val = val[key];
		if (!val) {
			return defaultVal;
		}
	}
	return val || defaultVal;
}

let obj = {
	a: {
		b: {
			c: {
				d: 'hello world',
			},
		},
	},
};

const res = get(obj, 'a.b.c.d', '没找到噢');

console.log(res);
