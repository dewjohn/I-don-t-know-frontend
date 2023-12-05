function Parent2() {
	this.name = 'parent2';
}

function child2() {
	this.type = 'fn';
}

child2.prototype = new Parent2();

let ob1 = new child2();
let ob2 = new child2();

// ob1.__proto__.name = 'change';

// console.log(Object.getPrototypeOf(ob2));

function Parent3() {
	this.name = 'parent3';
	this.arr = [1, 2, 3];
}

Parent3.prototype.fn = () => {
	console.log('parent3 fn');
};

function Child3() {
	Parent3.call(this);
	this.type = 'child3';
}

Child3.prototype = new Parent3();

const ob3 = new Child3();

// ob3.fn();

function Parent4() {
	this.name = 'parent4';
	this.arr = [1, 2, 3];
}

Parent4.prototype.fn = () => {
	console.log('parent4 fn');
};

function Child4() {
	Parent3.call(this);
	this.type = 'child4';
}

Child4.prototype = Parent4.prototype;

let ob4 = new Child4();
// console.log(ob4 instanceof Parent4);
// 这种继承方式不能区分出实例对象到底是构造函数所实例还是构造函数的父类实例化

// console.log(ob4.__proto__.constructor);

function Parent5() {
	this.name = 'parent5';
	this.arr = [1, 2, 3];
}

Parent5.prototype.fn = function () {
	console.log(this);
};

function Child5() {
	Parent3.call(this);
	this.type = 'child5';
}

Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

let ob5 = new Child5();

// console.log(ob5.__proto__);
// ob5.fn();

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	show() {
		console.log(this.x, this.y);
	}
}

class Color extends Point {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
	}
	showColor() {
		console.log(this.x, this.y, this.color);
	}
}

const color = new Color(1, 2, 'pink');

console.log(color);

color.show()