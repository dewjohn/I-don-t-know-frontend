Promise.prototype.done = function (onFullfilled, onRejected) {
	this.then(onFullfilled, onRejected).catch(function (error) {
		setTimeout(() => {
			throw error;
		}, 0);
	});
};

const promise = new Promise((resolved, rejected) => {
	setTimeout(() => {
		resolved(1);
	}, 1000);
});

promise
	.then((res1) => {
		console.log(res1);
	})
	.catch((err) => {
		console.log(err);
	})
	.then(() => {
		throw new Error('出现错误');
	});
