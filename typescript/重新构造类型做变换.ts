type pushTuple<Arr extends unknown[], Ele> = [...Arr, Ele];
type pushTupleResult = pushTuple<[1, 3, 2], 'cao'>; // [1, 3, 2, "cao"]

type unShift<Ele, Arr extends unknown[]> = [Ele, ...Arr];
type unShiftResult = unShift<'asd', [1, 2, 3, 4]>; // ["asd", 1, 2, 3, 4]

type Zip<
  One extends [unknown, unknown],
  Other extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneSecond]
  ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
    : []
  : [];
type ZipResult = Zip<['hello', '你好'], ['world', '世界']>; // [["hello", "world"], ["你好", "世界"]]

type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFitst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFitst, OtherFirst], ...Zip2<OneRest, OtherRest>]
    : []
  : [];

type Zip2Result = Zip2<[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd']>; // [[1, "a"], [2, "b"], [3, "c"], [4, "d"]]

type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Other}`
    ? `${Uppercase<First>}${Other}`
    : Str;

type CapitalizeStrResult = CapitalizeStr<'sophisticated'>; // "Sophisticated"

// dong_dong_dong 到 dongDongDong
type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;

type CamelCaseResult = CamelCase<'dong_dong_dong'>; // "dongDongDong"

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;

type DropSubStrResult = DropSubStr<'pleseDeleteMe', 'Delete'>; // "pleseMe"

type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer args
) => infer ReturnType
  ? (...args: [...args, Arg]) => ReturnType
  : [];

type AppendArgumentResult = AppendArgument<
  (args_0: number, args_1: string) => void,
  boolean
>; // (args_0: number, args_1: string, args_2: boolean) => void

// Mapping
type Mapping<Obj extends object> = {
  [key in keyof Obj]: Obj[key];
};

type Mapping2<Obj extends object> = {
  [key in keyof Obj]: [Obj[key], Obj[key]];
};

type Mapping2Result = Mapping2<{
  name: 'john';
  age: 1;
}>;

// name: ["john", "john"];
// age: [1, 1];

// UppercaseKey 重映射
type UppercaseKey<Obj extends object> = {
  [key in keyof Obj as Uppercase<key & string>]: Obj[key]; // 这里只接受string类型，所以要加 & 交叉类型
};
type UppercaseKeyResult = UppercaseKey<{
  name: 'john';
  age: 1;
}>;
// NAME: "john";
// AGE: 1;

// Record
type LikeRecord<K extends string | number | symbol, T> = {
  [P in K]: T;
};

type UppercaseKey2<Obj extends Record<string, any>> = {
  [key in keyof Obj as Uppercase<key & string>]: Obj[key]; // 这里只接受string类型，所以要加 & 交叉类型
};
type UppercaseKeyResult2 = UppercaseKey<{
  name: 'john';
  age: 1;
}>;

// ToReadonly
type ToReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

// toPartial
type ToPartial<T> = {
  [key in keyof T]?: T[key];
};

// ToMutable 去掉只读修饰符
type ToMutable<T> = {
  -readonly [key in keyof T]: T[key];
};

// ToRequired 去掉可选修饰符
type ToRequired<T> = {
  [key in keyof T]-?: T[key];
};

// FilterByValueType 可以在构造新索引类型的时候根据值的类型做下过滤
type FilterByValueType<Obj extends Record<string, any>, MyType> = {
  [key in keyof Obj as Obj[key] extends MyType ? key : never]: Obj[key];
};

type FilterByValueTypeResult = FilterByValueType<
  {
    name: string;
    age: number;
    score: boolean;
  },
  string | number
>;
// {
//   name: string;
//   age: number;
// }  筛掉了score