const arr1: string[] = [];

const arr2: Array<string> = [];

const arr3: [string, number, string] = ['a', 1, 'b'];

const arr4: [string, number?, number?] = ['a', , ,];

const arr5: [name: string, age: number, male: boolean] = ['asd', 1, true];

interface IDscription {
	readonly name: string;
	age: number;
}

const obj1: IDscription = {
	name: 'asd',
	age: 1,
};

// obj1.name = 'dsa'

const temp: {} = {
	name: 'asd',
};

// temp.name = 'dsa'

// 当你不确定某个对象的类型时，不要使用Object，建议具体区分
const temp1: Record<string, string> = {
	name: 'asd',
	// age: 18
};

// js 中 Symbol 代表着唯一值，但是TS中并不具有这种特征，无数个变量声明了Symbol类型，他们指向的都只是同一个类型
// 要实现唯一性，可以使用 unique symbol
const sb1: unique symbol = Symbol('sb1');
const sb2: unique symbol = Symbol('sb2');

// js 中可以通过 symbol.for('sb1') 复用已创建的Symbol
// 首先先查找有无以sb1为key的Symbol注册，如果有，返回这个Symbol，否则才会创建新的Symbol

// ts 中想要引用已创建的unique symbol类型，则要使用类型查询操作符
declare const sb3: unique symbol;

const sb33: typeof sb3 = sb3;

// 联合类型
interface Tmp {
	mixed: true | 599 | null | undefined | (() => {}) | (1 | 2);
}

// const TmpInstance: Tmp = {
// 	mixed: 'asd',
// };

const tmps: {} = 1; // 任何 undefined 或者 null 类型

interface Tmp1 {
	user:
		| {
				vip: true;
				expired: number;
		  }
		| {
				vip: false;
				promotion: string;
		  };
}

declare var Tmp11: Tmp1;

if (!Tmp11.user.vip) {
	console.log(Tmp11.user.promotion);
}

enum PageUrl {
	Home_Page_Url = 'url1',
	Setting_Page_Url = 'url2',
	Share_Page_Url = 'url3',
}

const home = PageUrl.Home_Page_Url;

const returnValueType = () => 123 + 456;

enum Items {
	Foo = returnValueType(),
	Bar = 1,
	Tar,
}

const test1 = Items.Foo;

const enum constantEnum {
	FOO,
	BAR,
	BAZ,
}

// const constantEnumInstance = constantEnum[0]  常量枚举不能通过枚举值访问枚举成员

const constantEnumInstance = constantEnum.BAR;


type isTrue = Object extends any ? 1 : 2