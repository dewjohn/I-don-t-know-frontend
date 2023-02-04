window.name = 'byte';
window.age = 1111
function A() {
  this.name = 123;
}
A.prototype.getA = function () {
  console.log(this);  // funcA() 因此调用者是全局window
  return this.name + 1; // 找到全局的name = 'byte' + 1
};
let a = new A();
let funcA = a.getA;
funcA();


// 构造函数原型上的方法this指向这个方法的调用者