function randomNum1(num) {
  return Math.floor(Math.random() * num);
}

// 随机从原来数组中抽一个出来，拼凑新数组
function randomNum2(arr) {
  const newArr = [];
  while (arr.length > 0) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    newArr.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return newArr;
}

// console.log(randomNum2([1, 2, 3, 4, 5, 6, 7, 8]));


// 洗牌效果
function randomNum3(arr){
  let length = arr.length
  for(let index = 0; index < arr.length; index++){
    let randomIndex = Math.floor((Math.random() * (length - index)) + index);
    console.log('randomIndex',randomIndex);
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
  }
  return arr
}

console.log(randomNum3([1, 2, 3, 4, 5, 6, 7, 8]));