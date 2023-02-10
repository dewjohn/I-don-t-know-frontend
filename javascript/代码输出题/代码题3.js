let x = 3;
const fn = (x) => {
  return (y) => {
    console.log(y + ++x);
  };
};
let f = fn(4)(5);
console.log(x); // 10 3
