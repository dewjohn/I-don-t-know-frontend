type IsAny<T> = 'dong' extends 'guang' & T ? true : false; // any 类型与任何类型的交叉都是 any

type IsAnyResult = IsAny<any>; // true

type IsAnyResult2 = IsAny<string>; // false

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type IsEqualResult = IsEqual<any, string>; // true
// 因为 any 可以是任何类型，任何类型也都是 any，所以当这样写判断不出 any 类型来
// 对 any 进行类型判断
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

type IsEqualResult2 = IsEqual2<any, string>; // false

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
// 首先 A extends A 触发分布式条件类型，如果条件类型中如果左边是联合类型，会把每个元素单独传入做计算
// 所以[B] extends [A], B 是联合类型 1 | 2 | 3，不可能被被A包含，肯定返回 true

type IsUnionResult = IsUnion<1 | 2 | 3>; // true
type IsUnionResult2 = IsUnion<1>; // false

type isNever<T> = [T] extends [never] ? true : false;
type isNeverResult = isNever<never>;
type TestAny<T> = T extends number ? 1 : 2;
type TestAnyResult = TestAny<any>; // 1 | 2

// 元组类型的['length']是数字字面量而数组类型的['length']是number类型
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true;
type isTuple<T> = T extends [...params: infer Eles]
  ? NotEqual<Eles['length'], number>
  : never;

type isTupleResult = isTuple<[1, '2']>; // true 元组

type isTupleResult2 = isTuple<number[]>; // false 数组

// 如果允许父类型赋值给子类型，就叫做逆变
// 如果允许子类型赋值给父类型，就叫做协变
// 在ts中函数参数是有逆变的性质的，也就是函数参数可能是多个类型，参数类型会变成他们的交叉类型
// 联合转交叉
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionRes = UnionToIntersection<{ a: 1 } | { b: 2 }>;
// {
//   a: 1;
// } & {
//   b: 2;
// }

// 提取索引类型中的可选索引
// 利用可选索引的值为undefined和值类型的联合类型
// Pick --> 取出索引对象的某个key，构造新的索引类型
type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
  // 过滤的方式就是单独取出该索引之后，判断空对象是否是其子类型。
  // 可选的意思是这个索引可能没有，没有的时候，那 Pick<Obj, Key> 就是空的，所以 {} extends Pick<Obj, Key> 就能过滤出可选索引。
};

type GetOptionalRes = GetOptional<{
  name: string;
  age?: number;
}>;

// 过滤掉所有非可选的索引类型
type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredRes = GetRequired<{
  name: string;
  age?: number;
}>;

// 去掉索引签名
// 利用索引签名不能构造字符串字面量类型
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};

type RemoveIndexSignatureRes = RemoveIndexSignature<{
  [key: string]: any;
  getName(): string;
}>;

// 过滤掉public
// keyof 只能拿到class的public类型
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};

class Dog {
  public name: string;
  protected age: number;
  private weight: number;
  constructor() {
    this.name = 'asd';
    this.age = 1;
    this.weight = 10;
  }
}

type ClassPublicPropsRes = ClassPublicProps<Dog>;

// as const 字面量类型
const Obj1 = {
  name: 'hello',
  age: 1,
};

type GetObj1Type = typeof Obj1;
// type GetObj1Type = {
//   name: string;
//   age: number;
// }
// 推导出来的不是字面量类型
const Obj2 = {
  name: 'hello',
  age: 1,
} as const;
type GetObj2Type = typeof Obj2;
// type GetObj2Type = {
//   readonly name: "hello";
//   readonly age: 1;
// }
// 但是加上 as const 之后推导出来的类型是带有 readonly 修饰的，所以再通过模式匹配提取类型的时候也要加上 readonly 的修饰才行。