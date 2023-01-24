// Add
// 1. 构造数组
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

// 2. 加法
// 加法就是通过构造输入两个数，构造两个数组，数组的长度就是构造的两个数值
type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]['length'];

type AddResult = Add<100, 23>; // 123

// 3. 减法
// 减法就是通过被减数Num1 模式匹配提取Num2长度个元素，剩下的放在 infer 声明的变量Rest里，Rest就是减法的差值
type Subtract<
  Num1 extends number,
  Num2 extends number
> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
  ? Rest['length']
  : never;

type SubtractResult = Subtract<100, 23>;

// 4. 乘法
type Multiply<
  Num1 extends number,
  Num2 extends number,
  ResultArr extends unknown[] = []
> = Num2 extends 0
  ? ResultArr['length']
  : Multiply<Num1, Subtract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;

type MultiplyResult = Multiply<2, 3>; // 2*3 === 2 + 2 + 2 每加一次就把 Num2 减一，直到 Num2 为 0，就代表加完了。

// 5. 除法
// 除法就是被除数 Num1 连续减去除数 Num2， 当 Num1 减到 0 时，减了多少次就是结果
type Divide<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends 0
  ? CountArr['length']
  : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>; // unknown 就是一个 count ，用来记录减了多少次的，每一次递归都往数组里加一个 unknown

type DivideResult = Divide<10, 5>;

// 字符串长度
// 通过每一次递归 ${string}${infer Rest} 取一个字符，然后 CountArr'数组里放入一个 unknown 相当于计数加一， 当Str为空，返回CountArr的长度
type StrLen<
  Str extends string,
  CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [unknown, ...CountArr]>
  : CountArr['length'];

type StrLenResult = StrLen<'helloWorld'>;

// 比较大小
// 如果谁先达到 CountArr 的长度，谁就小
type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2 // 是否相等
  ? false
  : Num2 extends CountArr['length'] // Num2是否和CountArr相等，相等返回false，说明 Num1 》 Num2
  ? true
  : Num1 extends CountArr['length'] // Num1是否和CountArr相等，相等返回true，说明 Num2 》 Num1
  ? false
  : GreaterThan<Num1, Num2, [unknown, ...CountArr]>; // 递归，每次往 CountArr 添加一个 unknown，让数组长度加一

type GreaterThanResult = GreaterThan<100, 99>; // true 说明 100 》 99
type GreaterThanResult2 = GreaterThan<100, 999>; // false 说明 100 《 999

// fibonacci --> 1、1、2、3、5、8、13、21、34、
type FibonacciLoop<
  PrevArr extends unknown[], // 之前累加值
  CurrentArr extends unknown[], // 当前数值
  IndexArr extends unknown[], // 记录 index
  Num extends number = 0 // 求数列第几个数
> = IndexArr['length'] extends Num
  ? CurrentArr['length']
  : FibonacciLoop<
      CurrentArr,
      [...PrevArr, ...CurrentArr],
      [unknown, ...IndexArr],
      Num
    >;

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

type FibonacciResult = Fibonacci<6>


