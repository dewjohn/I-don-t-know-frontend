type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType<ValueType>
    : ValueType
  : never;

type DeepPromiseValueTypeResult = DeepPromiseValueType<
  Promise<Promise<Record<string, any>>>
>;

// 化简
type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;
type DeepPromiseValueTypeResult2 = DeepPromiseValueType2<
  Promise<Promise<Record<string, any>>>
>;

// [1,2,3,4,5]; --> [5,4,3,2,1];
type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer One,
  infer Two,
  infer Three,
  infer Four,
  infer Five
]
  ? [Five, Four, Three, Two, One]
  : Arr;

type ReverseArrResult = ReverseArr<[1, 2, 3, 4, 5]>; // [5, 4, 3, 2, 1]

// 递归
type ReverseArr2<Arr extends unknown[]> = Arr extends [infer One, ...infer Rest]
  ? [...ReverseArr2<Rest>, One]
  : Arr;

type ReverseArrResult2 = ReverseArr2<[1, 2, 3, 4, 5]>; // [5, 4, 3, 2, 1]

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type Include<Arr extends unknown[], FindItem> = Arr extends [
  infer One,
  ...infer Rest
]
  ? IsEqual<One, FindItem> extends true
    ? true
    : Include<Rest, FindItem>
  : false;

type IncludeResult = Include<[1, 2, 3, 4, 5], 5>; // true

type RemoveItem<
  Arr extends unknown[],
  DeleteItem,
  Result extends unknown[]
> = Arr extends [infer One, ...infer Rest]
  ? IsEqual<One, DeleteItem> extends true
    ? RemoveItem<Rest, DeleteItem, Result>
    : RemoveItem<Rest, DeleteItem, [...Result, One]>
  : Result;

type RemoveItemResult = RemoveItem<[1, 3, 2, 4, 3, 7, 8, 3], 3, []>; // [1, 2, 4, 7, 8]

// 如果Arr 达到了长度Length，就返回Arr，否则再加一个元素
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrayResult = BuildArray<5>;

type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer One}${From}${infer Two}` ? `${One}${To}${Two}` : Str;

type ReplaceAllResult = ReplaceAll<'hello world haha', 'world', '世界'>; // "hello 世界 haha"

// 递归
type ReplaceAll2<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll2<Right, From, To>}`
  : Str;

type ReplaceAllResult2 = ReplaceAll2<
  'hello world to world to world balabala',
  'world',
  '世界'
>; // "hello 世界 to 世界 to 世界 balabala"

type StringToUnion<Str extends string> =
  Str extends `${infer One}${infer Two}${infer Three}${infer Four}${infer Five}`
    ? `${One} | ${Two} | ${Three} | ${Four} | ${Five}`
    : Str;
type StringToUnionResult = StringToUnion<'hello'>; // "h | e | l | l | o"

type StringToUnion2<Str extends string> =
  Str extends `${infer One}${infer Rest}`
    ? `${One} | ${StringToUnion2<Rest>}`
    : Str;
type StringToUnionResult2 = StringToUnion2<'hellasdsadasdasdo'>; // "h | e | l | l | a | s | d | s | a | d | a | s | d | a | s | d | o | "

type ReverseStr<
  Str extends string,
  Result extends string = ''
> = Str extends `${infer First}${infer Rest}`
  ? ReverseStr<Rest, `${First}${Result}`>
  : Result;

type ReverseStrResult = ReverseStr<'hello'>; // "olleh"

type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object
    ? Obj[Key] extends Function
      ? DeepReadonly<Obj[Key]>
      : Obj[Key]
    : Obj[Key];
};

type obj = {
  a: {
    b: {
      c: {
        f: () => 'dong';
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};

type DeepReadonlyResult = DeepReadonly<obj>['a']; // 此时 b 并没有加上 readonly

type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly2<Obj[Key]>
        : Obj[Key];
    }
  : never;
type DeepReadonlyResult2 = DeepReadonly2<obj>; // 因为 ts 的类型只有被用到的时候才会做计算
