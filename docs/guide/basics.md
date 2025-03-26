# TypeScript 基础

在开始类型体操之前，我们需要先掌握 TypeScript 的基本类型系统概念。这些是构建复杂类型的基础。

## 基本类型

TypeScript 包含以下基本类型：

```typescript
// 基本类型
let num: number = 123;
let str: string = "hello";
let bool: boolean = true;
let u: undefined = undefined;
let n: null = null;
let obj: object = { x: 1 };
let big: bigint = 100n;
let sym: symbol = Symbol("sym");
```

## 数组与元组

```typescript
// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 元组：长度固定且每个位置有特定类型的数组
let tuple: [string, number] = ["hello", 10];
```

## 对象和接口

```typescript
// 接口定义对象结构
interface User {
  name: string;
  age: number;
  email?: string; // 可选属性
  readonly id: number; // 只读属性
}

const user: User = {
  name: "Alice",
  age: 25,
  id: 1
};
```

## 联合类型与交叉类型

```typescript
// 联合类型
type ID = string | number;
let id: ID = 123; // 可以是字符串或数字

// 交叉类型
type Employee = {
  id: number;
  name: string;
};

type Department = {
  deptId: number;
  location: string;
};

type EmployeeWithDept = Employee & Department;
```

## 类型别名

```typescript
// 类型别名用 type 关键字定义
type Point = {
  x: number;
  y: number;
};

// 可以用于简化复杂类型
type UserID = string | number;
type UserCallback = (id: UserID) => void;
```

## 枚举

```typescript
// 枚举定义一组命名常量
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir: Direction = Direction.Up;
```

## 函数类型

```typescript
// 函数类型定义
function add(a: number, b: number): number {
  return a + b;
}

// 函数类型表达式
type MathFunc = (a: number, b: number) => number;
const multiply: MathFunc = (x, y) => x * y;

// 可选参数和默认参数
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
```

## 字面量类型

```typescript
// 字面量类型：只能是特定的值
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up"; // 只能是这四个值之一

// 数字字面量类型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3;
```

## 类型断言

```typescript
// 类型断言：告诉编译器一个值的类型
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
// 或
let strLength2: number = (<string>someValue).length; // 旧语法，JSX 中不能使用
```

## 非空断言

```typescript
// 非空断言运算符 !
function getValue(x: string | null | undefined): string {
  // 断言 x 不为 null 或 undefined
  return x!.toUpperCase();
}
```

## 类型推断

TypeScript 可以根据上下文自动推断类型：

```typescript
// 变量初始化时的类型推断
let x = 3; // 推断为 number

// 函数返回值的类型推断
function getLength(s: string) {
  return s.length; // 返回值推断为 number
}
```

## never 和 unknown 类型

```typescript
// never 类型：永不返回（抛出异常或无限循环）
function throwError(message: string): never {
  throw new Error(message);
}

// unknown 类型：类型安全的 any
let value: unknown;
value = 123;
value = "hello";

// 必须进行类型检查或类型断言才能使用特定类型的方法
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

## keyof 操作符

```typescript
// keyof 获取对象类型的所有键的联合类型
interface Person {
  name: string;
  age: number;
  location: string;
}

type PersonKeys = keyof Person; // "name" | "age" | "location"

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

## 泛型

```typescript
// 泛型：可重用的类型参数
function identity<T>(arg: T): T {
  return arg;
}

// 调用方式
let output1 = identity<string>("myString");
let output2 = identity("myString"); // 类型推断

// 泛型接口
interface Box<T> {
  value: T;
}

let box: Box<number> = { value: 123 };
```

掌握这些基础概念后，我们就可以进入更高级的[类型操作](/guide/type-operations)了。
