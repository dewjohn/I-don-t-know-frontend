function repeat(str, n) {
  return new Array(n + 1).join(str);
}

console.log(repeat('asd', 1));

function repeat2(str, n) {
  let res = '';
  for (let i = 0; i < n; i++) {
    res += str;
  }
  return res;
}

function repeat3(str, n) {
  return n > 0 ? str.concat(repeat3(str, --n)) : '';
}

console.log(repeat2('asd', 1));


console.log(repeat3('asd', 1));
