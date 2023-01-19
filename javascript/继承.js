// 原型链实现继承
// 不能向父级传递参数
// 且每生成一次子级的实例，都会创建父级实例
function Foo() {
  this.name = 'asd';
}

Foo.prototype.fn = () => {
  console.log('hello');
};

function Bar() {}

Bar.prototype = new Foo();

// let bar = new Bar()

// console.log(bar.name)
// bar.fn()

// 构造函数实现继承
// 实现子级父级参数传递
// 子类各个实例无法共享属性，方法
// 子类实例无法使用父级原型对象
function Foo1(name, age) {
  this.name = name;
  this.age = age;
  this.fn = () => {
    console.log('asd');
  };
}

Foo.prototype.address = '原型';
Foo1.prototype.foo = () => {
  console.log('原型上的');
};

function Bar1(name, age, grade) {
  Foo1.call(this, name, age);
  this.gade = grade;
}

// let bar1 = new Bar1('john', 1, 100)

// console.log(bar1.name)
// bar1.fn()
// // bar1.foo()
// console.log(bar1.address) // undefined

// 组合实现继承
// 两次调用构造函数，导致子类原型上添加了不必要父类构造函数中的方法
function Foo2(name, age) {
  this.name = name;
  this.age = age;
  this.fn = () => {
    console.log('asd');
  };
}

function Bar2(name, age, grade) {
  Foo1.call(this, name, age);
  this.gade = grade;
}

Bar2.prototype = new Foo2();
Bar2.prototype.constructor = Bar2;

// let bar2 = new Bar2('john', 1, 100)

// console.log(Object.getPrototypeOf(bar2))

// Object.create()
function Foo3(o) {
  let fn = function () {};
  fn.prototype = o;
  return new fn();
}

// 寄生实现继承
// 原理就是继承一个对象，在此对象基础上进行扩展，返回新对象
function Foo4(obj) {
  let ojb = Object(obj);
  obj.name = 'asd';
  return ojb;
}

// 寄生式组合实现继承
// 直接把原型指向父类原型对象
function Foo5(name, age) {
  this.name = name;
  this.age = age;
  this.fn = () => {
    console.log('asd');
  };
}

function Bar5(name, age, grade) {
  Foo1.call(this, name, age);
  this.gade = grade;
}

Bar5.prototype = Object.create(Foo5.prototype)

