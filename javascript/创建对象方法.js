// 工厂模式创建对象
function createObject(name, age, fn) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.fn = fn;
  return o;
}

// 构造函数创建对象
function CreateObject1(name, age, fn) {
  this.name = name;
  this.age = age;
  this.fn = fn;
  this.foo = () => {
    console.log(this);
  };
}

// 箭头函数的this, 就是定义该函数时所在作用域指向的this,而不是使用时所在作用域指向的this
let obj = new CreateObject1('john', 1, () => {
  console.log(this);
});

// obj.fn();
// obj.foo();

// 原型链创建对象
// 原型链配合构造函数创建对象
// 每一个实例都有一份属于自己的属性的方法，还共用原型上的属性和方法
function Foo(name, age){
  this.name = name
  this.age = age
}
Foo.prototype = {
  constructor: Foo,
  fn: () => {
    console.log('first')
  }
  
}

let foo = new Foo('asd', 11)

foo.fn()

