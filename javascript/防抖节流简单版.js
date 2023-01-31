
// 防抖：事件触发一段时间才会触发回调函数，如果这段时间又有事件触发，则重新计时

function debounce(fn, delay){
  let timer = null
  return function(){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this)
    }, delay)
  }
}

// 节流： 一定时间内，无论事件触发多少次，只有一次事件触发回调函数

function throttle(fn, delay){
  let lastTime = Date.now()
  return function(...args){
    let curTime = Date.now()
    if(curTime - lastTime >= delay){
      fn.call(fn, ...args)
      lastTime = curTime
    }
  }
}