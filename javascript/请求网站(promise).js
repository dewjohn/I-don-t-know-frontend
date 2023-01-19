function reqeustUrl(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) resolve(url);
      else reject(url);
    }, 1000);
  });
}

// reqeustUrl('www.').then((res1) => {
//   reqeustUrl(res1 + 'baidu').then((res2) => {
//     reqeustUrl(res2 + '.com').then((res3) => {
//       console.log(res3);
//     });
//   });
// });


function* reqeustUrl1(){
  const res1 = yield reqeustUrl('www')
  const res2 = yield reqeustUrl(res1 + 'baidu')
  yield reqeustUrl(res2 + '.com')
}

let request = reqeustUrl1()

request.next().value.then(res1 => {
  request.next(res1).value.then(res2 => {
    request.next(res2).value.then(res => {
      console.log(res)
    })
  })
})


async function reqeustUrl2(){
  const res1 = await reqeustUrl('www.')
  const res2 = await reqeustUrl(res1 + 'baidu')
  const res3 = await reqeustUrl(res2 + '.com')
  return res3
}

// reqeustUrl2().then(res => {
//   console.log(res)
// })
