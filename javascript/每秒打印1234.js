// 定时器实现
const foo = () => {
  let count = 0;
  return () => {
    setInterval(() => {
      count++;
      console.log(count);
    }, 1000);
  };
};

// let bar = foo()
// bar()

// 闭包实现
const foo1 = () => {
  for (var index = 0; index < 5; index++) {
    (function (index) {
      setTimeout(() => {
        console.log(index);
      }, index * 1000);
    })(index);
  }
};

// foo1();

// 使用let块级作用域
let foo2 = () => {
  for (let index = 0; index < 5; index++) {
    setTimeout(() => {
      console.log(index)
    }, index * 1000) 
  }
}

// foo2()

for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  })(i);
}