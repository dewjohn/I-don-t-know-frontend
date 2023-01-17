/**
 * 传入promise数组，当传入的所有的promise都resolve，则返回resolve
 * 有一个promise出现reject，则直接reject
 * resolve时的顺序与promsie数组传入顺序一致
 */
Promise.all = (p) => {
  let result = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < p.length; i++) {
      p[i]
        .then((res) => {
          result.push(res);
          if (result.length === p.length) resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1');
  }, 3000);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2');
  }, 2000);
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3');
  }, 1000);
});
let p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p4');
  }, 500);
});

let res = Promise.all([p1, p2, p3, p4])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
