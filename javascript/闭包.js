/**
 * 当内部函数引用外部函数的变量时，此变量就会突破生命周期的限制，在函数结束执行后还会存在
 */

function counter() {
  let curVal = 0;
  function counting() {
    curVal++;
  }
  function getCounter() {
    console.log(`cur count is ${curVal}`);
  }
  return { counting, getCounter };
}

let counter1 = counter();

counter1.counting();
counter1.counting();
counter1.counting();
counter1.getCounter();

/**
 * 使用对象的内存和运算通常优于闭包
 */

function PrintName(name) {
  return function () {
    return `${name} 鸡你太美`;
  };
}

let peter = PrintName('peter');

console.log(peter());

function PrintName1(name) {
  return `${this.name} 鸡你太美`;
}

let john = PrintName1.bind({name: 'john'})

console.log(john())