let arr1 = [1, 2, 3, [11, 22, 33, 55, [111, 222, 333]], 4];

function flatArray(array) {
  const res = array.map(item => {
    if(Array.isArray(item)){
      return flatArray(item)
    }
    return [item]
  })
  return [...new Set([].concat(...res))]
};

res = flatArray(arr1)
console.log(res)