type Union = 'a' | 'b' | 'c';
// 联合类型当中，不需要递归，会把联合类型的每一个元素单独传入作类型计算然后合并
type UnionUppercase<Item extends string> = Item extends 'a'
  ? Uppercase<Item>
  : Item;

type UnionUppercaseResult = UnionUppercase<Union>; // "b" | "c" | "A"

type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str;

type CamelcaseResult = Camelcase<'ha_ha_ha'>; // "haHaHa"

type CamelcaseArr<StrArr extends unknown[]> = StrArr extends [
  infer First,
  ...infer Rest
]
  ? [Camelcase<First & string>, ...CamelcaseArr<Rest>]
  : [];

type CamelcaseArrResult = CamelcaseArr<['aa_aa_aa', 'bb_bb_bb', 'cc_cc_cc']>; // ["aaAaAa", "bbBbBb", "ccCcCc"]

type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item;

type CamelcaseUnionResult = CamelcaseUnion<
  'aa_aa_aa' | 'bb_bb_bb' | 'cc_cc_cc'
>; // "aaAaAa" | "bbBbBb" | "ccCcCc"

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

// 数组转联合类型
type union = ['aaa', 'bbb'][number];

type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}_${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;

// AllCombinations
type Combinations<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A // A extends A 的意义就是让联合类型每个类型单独传入做处理
  ? Combinations<A, AllCombinations<Exclude<B, A>>>
  : never;

type AllCombinationsResult = AllCombinations<'A' | 'B' | 'C'>;

// A extends A 取出联合类型中的单个类型放入 A