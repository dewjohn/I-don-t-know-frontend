// 给你两个数组，判断包含关系，比如 arr1 包含 arr 2 ，返回 1
// arr2 包含 arr1 ，返回2
// 两数组相等，返回0
// 其他返回 -1


function bar(arr1, arr2){
  let count = 0
  if(arr1.length > arr2.length) {
    count = foo(arr1, arr2)
    if(count === arr2.length) return 1
  }
  if(arr2.length > arr1.length) {
    count = foo(arr2, arr1)
    if(count === arr1.length) return 2
  }
  return -1
}

function foo(arr1, arr2){
  let count = 0
  arr2.forEach(element => {
    if(arr1.indexOf(element) !== -1){
      count = count + 1
    }
  });
  return count
}

// arr1 包含 arr2
let arr2 = [1, 4, 7, 8];
let arr1 = [7, 4, 1, 8, 5, 3];

// arr1不包含arr2
let arr22 = [1, 4, 7, 8, 22];
let arr11 = [7, 4, 1, 8, 5, 3];

// arr2 包含 arr1
let arr222 = [1, 4, 7, 8];
let arr111 = [7, 4, 1];

// arr2 不包含 arr1
let arr2222 = [1, 4, 7, 8, 22, 33];
let arr1111 = [7, 4, 1, 8, 5];

let res = bar(arr1111, arr2222)

console.log(res)