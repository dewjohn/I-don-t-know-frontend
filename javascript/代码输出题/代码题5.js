'use strict';
var name = 'window';

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name);
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name); // 严格模式下禁止this指向全局
    };
  },
  show4: function () {
    return () => console.log(this.name);
  },
};
var person2 = { name: 'person2' };

person1.show1();
person1.show1.call(person2);

person1.show2();
person1.show2.call(person2);

person1.show3()();
person1.show3().call(person2);

/**
 * person1
 * person2
 * 
 * window
 * window
 * 
 * window
 * person2
 * 
 */
