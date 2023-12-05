class C {
	x = 0;
	y = 0;
}

type T0 = InstanceType<typeof C>; // C

const T0Ins: T0 = new C();

T0Ins.x = 1;
T0Ins.y = 2;

type T1 = InstanceType<any>; // any
type T2 = InstanceType<never>; // never
type T3 = InstanceType<string>; // Error
type T4 = InstanceType<Function>; // Error

type MyRecord<K extends keyof any, T> = {
	[P in K]: T;
};

type Dictionary<T> = {
	[index: string]: T;
};

type NumericDictionary<T> = {
	[index: number]: T;
};

type MyPick<T, k extends keyof T> = {
	[P in k]: T[P];
};
type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;

type MyOmitRes = MyOmit<
	{
		name: 'asd';
		age: 18;
		addr: 'where';
	},
	'addr'
>;

type ClassType = abstract new (...args: any) => any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (
	...args: infer P
) => any
	? P
	: never;

type FirstArrayItemType<T extends any[]> = T extends [
	infer A extends string,
	...any[]
]
	? A
	: never;

type DeepPartial<T extends object> = {
	[K in keyof T]: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepReadOnly<T extends object> = {
	readonly [K in keyof T]: T[K] extends object ? DeepReadOnly<T[K]> : T[K];
};

type DeepRequired<T extends object> = {
	[K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

type NonNullable<T> = T extends null | undefined ? never : T;

type MarkPropsAsOptional<
	T extends object,
	K extends keyof T = keyof T
> = Partial<Pick<T, K>> & Omit<T, K>;

type FuncStruct = (...args: any[]) => any;

type Tmp<T extends object> = {
	[K in keyof T]: T[K] extends FuncStruct ? K : never;
};

type Res = Tmp<{
	foo: () => void;
	bar: () => number;
	baz: number;
}>;

type ResEqual = {
	foo: 'foo';
	bar: 'bar';
	baz: never;
};

type WhatWillWeGet = Res[keyof Res];

type ExpectedPropKeys<T extends object, ValueType> = {
	[Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];

expectType<
	FunctionKeys<{
		foo: () => void;
		bar: () => number;
		baz: number;
	}>
>('foo');

type CopyWithRename<T extends object> = {
	[K in keyof T as `rename_${string & K}`]: T[K];
};

type Trim<V extends string> = V extends ` ${infer R}` ? R : V;

type Split<
	Str extends string,
	Delimiter extends string
> = Str extends `${infer head}${Delimiter}${infer tail}`
	? [head, ...Split<tail, Delimiter>]
	: Str extends Delimiter
	? []
	: [];

declare var f1: () => void;

declare interface Foo {
	props: string;
}

declare function foo(input: Foo): Foo;

declare class Foo {}

declare let otherProps: Foo['props'];

declare let result: ReturnType<typeof foo>;

declare module 'pkg' {
	const handler: () => boolean;
}


