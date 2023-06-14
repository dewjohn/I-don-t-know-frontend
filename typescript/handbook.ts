

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