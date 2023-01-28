// Parameters 用来提取函数类型的参数类型
type MyParameters<T extends Function> = T extends (...args: infer Args) => any
  ? Args
  : never;

type MyParametersRes = MyParameters<(name: string, age: number) => void>;

// ReturnType
type MyReturnType<T extends Function> = T extends (
  ...args: any
) => infer ReturnType
  ? ReturnType
  : never;

type MyReturnTypeRes = MyReturnType<() => 'hello world'>;

// ConstructorParameters 构造器类型，和函数类型的区别是可以被new
type MyConstructorParameters<T extends abstract new (...args: any) => any> = // 加 abstract 代表不能直接被实例化
  T extends abstract new (...args: infer P) => any ? P : never;

interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person;
}

type MyConstructorParametersRes = MyConstructorParameters<PersonConstructor>;

// InstanceType 提取高中函数类型的返回值类型
type MyInstanceType<T extends abstract new (...args: any) => any> = // 加 abstract 代表不能直接被实例化
  T extends abstract new (...args: any) => infer P ? P : never;

type MyInstanceTypeRes = MyInstanceType<PersonConstructor>;

// ThisParameterType 提取函数中的this
type MyThisParameterType<T> = T extends (this: infer U, ...args: any) => any
  ? U
  : unknown;

function hello(this: Person) {
  console.log(this.name);
}

type MyThisParameterTypeRes = MyThisParameterType<typeof hello>;

// OmitThisParameter 提取this的类型，构造新的
// 删除this的类型
// 1. 通过 unknow extends ThisParameterType<T> 先提取this的类型，如果提取的是unknow或者any类型，说明没有指定类型，然后T
// 2. 否则，就通过模式匹配提取参数和返回值的类型到 infer 声明的局部变量 A 和 R 中，用它们构造新的函数类型返回
type MyOmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;

function say(this: Person, age: number) {
  console.log(this.name);
  return this.name + ' ' + age;
}

type MyOmitThisParameterRes = MyOmitThisParameter<typeof say>; // (age: number) => string

// Partial
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyPartialRes = MyPartial<{
  name: string;
  age: number;
}>;

// Required 去掉可选
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyRequiredRes = MyRequired<{
  name?: string;
  age?: number;
}>;

// Readonly
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type MyReadonlyRes = MyReadonly<{
  name: string;
  age: number;
}>;

// Pick 取出索引类型的一部分索引，构造新的索引
type MyPick<T, K extends keyof T> = {
  // 类型K为要过滤出来的索引，通过extends约束只能是T索引的子集
  [P in K]: T[P];
};

type MyPickRes = MyPick<
  {
    name: string;
    age: number;
  },
  'name'
>; // name: string;

// Record 创建索引类型，传入 key 和值的类型
type MyRecord<K extends keyof any, T> = {
  // K extends Keyof any --> 动态获取string | number | symbol
  [P in K]: T;
};

type MyRecordRes = MyRecord<'a' | 'b', boolean>;

type MyRecordRes1 = MyRecord<number, boolean>; // 索引签名
type MyRecordRes2 = MyRecord<string, boolean>; // 索引签名

// Exclude 想从一个联合类型去掉一部分类型
type MyExclude<T, U> = T extends U ? never : T;
// 原理是因为当联合类型当作为类型参数出现在条件类型左边时，会触发分布式条件类型，会分散成单个类型传入
type MyExcludeRes = MyExclude<'a' | 'b' | 'c', 'b'>; // "a" | "c"

// Extract 保留 Exclude的反过来
type MyExtract<T, U> = T extends U ? T : never;

type MyExtractRes = MyExtract<'a' | 'b' | 'c', 'b'>; // "b"

// Omit 去掉索引类型的一部分索引，构造新的索引类型
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type MyOmitRes = MyOmit<
  {
    name: string;
    age: number;
  },
  'name'
>; // age: number;

type MyAwait<T> = T extends undefined | null // T 待处理的类型
  ? T // 如果 T 是 null 或者 undefined，就返回 T。
  : T extends object & { then(onfulfilled: infer F): any } // 如果T是对象类型，并且有then方法，就提取then的参数，也就是onfulfilled 函数的类型到 infer 声明的局部变量 F
  ? F extends (value: infer V, ...args: any) => any // 继续提取 onfullfilled 函数类型的第一个参数的类型，也就是 Promise 返回的值的类型到 infer 声明的局部变量 V。
    ? Awaited<V> // 递归的处理提取出来的 V，直到不再满足上面的条件。
    : never
  : T;

type MyAwaitRes = MyAwait<Promise<Promise<string>>> // string


// NonNullable 判断是否非空类型
type MyNonNullable<T> = T extends null | undefined ? never : T;

type MyNonNullableRes = MyNonNullable<null>

