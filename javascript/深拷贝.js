// function deepClone1(obj) {
//   if (obj && typeof obj !== 'object') return obj;
//   let newObj = {};
//   for (const key in obj) {
//     newObj[key] = deepClone(obj[key]);
//   }
//   return newObj;
// }

const isObject = (obj) => {
  let typeObj = typeof obj;
  return obj !== null && (typeObj === 'object' || typeObj === 'function');
};

// 支持数组 函数 Symbol
function deepClone2(oldObj) {
  if (typeof oldObj === 'symbol') return Symbol(oldObj.description);
  if (typeof oldObj === 'function') return oldObj;
  if (!isObject(oldObj)) return oldObj;
  const newObj = Array.isArray(oldObj) ? [] : {};
  for (const key in oldObj) {
    newObj[key] = deepClone2(oldObj[key]);
  }
  // symbol
  const symbolkeys = Object.getOwnPropertySymbols(oldObj)
  for (const key of symbolkeys) {
    newObj[key] = deepClone2(oldObj[key])
  }
  // Set
  if(oldObj instanceof Set){
    newObj = new Set([...oldObj])
  }
  // Map
  if(oldObj instanceof Map){
    newObj = new Map([...oldObj])
  }
  return newObj;
}

const s1 = Symbol('这是s1');
const s2 = Symbol('这是s2');

let obj = {
  name: 'john',
  age: 18,
  friends: {
    address: '广西',
  },
  nums: [1, 3, 5, 12, 44, 22],
  foo: function () {
    console.log('foo函数');
  },
  [s1]: s1,
  [s2]: s2,
};

let newObj1 = deepClone2(obj);

console.log(newObj1);
