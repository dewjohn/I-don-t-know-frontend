
const requestArr = [() => api.request1(), () => api.request2(), () => api.request3()]

const finallyRequest = (requestArr) => {
  requestArr.reduce((acc, cur) => acc.then(() => cur()))
}