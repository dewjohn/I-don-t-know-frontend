let target = {
	name: 'obj',
};

let handle = {
	get: function (target, key) {
		console.log(`${key}被获取`);
		return target[key];
	},
	set: function (target, key, value) {
		console.log(`${key}被设置成${value}`);
		target[key] = value;
	},
};

let targetHandler = new Proxy(target, handle);

// console.log(targetHandler.name);

// targetHandler.name = 'zdw';

// console.log(targetHandler.name);
// console.log(target.name);

function Animal() {
	return createValidator(this, animalValidator);
}

var animalValidator = {
	name: function (name) {
		return typeof name === 'string';
	},
};

function createValidator(target, validator) {
	return new Proxy(target, {
		set: function (target, key, value) {
			console.warn('validator', validator, key);
			if (validator[key]) {
				if (validator[key](value)) {
					target[key] = value;
				} else {
					throw new Error('error');
				}
			} else {
				target[key] = value;
			}
		},
	});
}

var dog = new Animal();

dog.name = 'dog';

console.log(dog.name);

dog.name = 123;

// reflect
const ages = [1, 2, 3, 4, 5];

const yongest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(yongest);
