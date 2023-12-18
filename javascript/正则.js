// 6222023100014763381 -->6222 0231 0001 4763

var str = '6222023100014763381';

var strs = str.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');

console.log(strs);

function debounce(fn, delay) {
	let timer = null;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call(this, args);
		}, delay);
	};
}
