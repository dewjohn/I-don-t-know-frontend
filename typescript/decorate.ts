// 类装饰器
@AddProperty('john')
@AddMethod()
class Foo {
	a = 1;
}

function AddProperty(): ClassDecorator {
	return (target: any) => {
		target.prototype.newInstanceMethod = () => {
			console.log('add a method');
		};
		target.prototype.newStaticMethod = () => {
			console.log('this is a method');
		};
	};
}

function AddProperty(value: string): ClassDecorator {
	return (target: any) => {
		target.prototype.newInstancePropery = value;
		target.newStaticProperty = `static ${value}`;
	};
}

const foo = new Foo()