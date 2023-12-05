const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
	setTimeout(reject, 1000, 'foo');
});
const promise4 = Promise.reject('hhhh');

Promise.all([promise1, promise2, promise3, promise4])
	.then((values) => {
		console.log(values);
	})
	.catch((err) => {
		console.log('err', err);
	});
