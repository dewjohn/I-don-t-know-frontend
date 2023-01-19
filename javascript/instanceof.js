
function myInstaceof(obj, fn){
  let objProto = Object.getPrototypeOf(obj)
  let prototype = fn.prototype
  while(true){
    if(!objProto) return false
    if(objProto === prototype) return true
    objProto = Object.getPrototypeOf(objProto)
  }
}


function Foo(){}
function Bar(){}

let foo = new Foo()

let bar = new Bar()


console.log(myInstaceof(bar, Foo))