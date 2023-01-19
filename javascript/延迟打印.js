function delay1(timer) {
  setTimeout(() => {
    console.log('hello');
  }, timer);
}

// delay1(2000)

function delay2(timer) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timer);
  });
}

// delay2(2000).then(e => {
//   console.log('延迟了两秒')
// })

function* delay3(ms) {
  yield new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

(delay3(1000).next().value).then(() => {
  console.log('res')
})