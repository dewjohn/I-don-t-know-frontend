const foo = {
	foo: 'Foo',
	bar: {
		bar: 'bar',
	},
};
foo.bar.baz = foo;

function execRecursively(fn, subject, _refs = new WeakSet()) {
	if (_refs.has(subject)) {
		return;
	}
	fn(subject);
	if (typeof subject === 'object') {
		_refs.add(subject);
		for (const key in subject) {
			execRecursively(fn, subject[key], _refs);
		}
	}
}

execRecursively((obj) => console.log(obj), foo);
