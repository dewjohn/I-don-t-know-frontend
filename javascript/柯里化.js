// 一种函数的转换
// fn(a,b,c,d) --> fn(a)(b)(c)(d)

function myCurring(fn) {
  return function curring(...args) {
    // 判断传入参数是否达到fn的参数个数
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
    } else {
      return function _curring(..._args) {
        return curring.apply(this, [...args, ..._args]);
      };
    }
  };
}

const fn = (a, b, c, d) => {
  return a + b + c + d;
};

const curringsFn = myCurring(fn);

console.log(curringsFn(1)(4)(5, 6));



function add(a){
  return function(b){
    return function(c){
      return a + b + c
    }
  }
}


console.log(add(1)(2)(3))