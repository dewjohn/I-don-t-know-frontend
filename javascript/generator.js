function* generatorFn() {
	yield 1;
	yield 2;
	yield 3;
}

let generators = generatorFn();

console.log(generators.next().value);
console.log(generators.next().value);
console.log(generators.next().value);
