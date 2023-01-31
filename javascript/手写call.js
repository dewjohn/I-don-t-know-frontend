Function.prototype.myCall = function (thisArg, ...args) {
  // 获取需要被执行的函数
  let fn = this;
  // 对thisArg转成对象类型
  thisArg = thisArg === ('undefined' || 'null') ? window : Object(thisArg);
  thisArg.fn = fn;
  let res = thisArg.fn(...args);
  delete thisArg.fn;
  return res;
};

function foo(a,b,c,d) {
  console.log(this);
  return a + b + c + d
}

let res1 = foo.myCall('asd', 1, 2, 3, 4);

let res2 = foo.call('asd', 1, 2, 3, 4);

console.log(res1)

console.log(res2)

