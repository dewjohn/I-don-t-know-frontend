
function foo() {
  count = 0
  return function(){
    if(count === 0) {
      console.log('hahaha')
    }
    count++
  }
}


let fn = foo()

fn()
fn()
fn()