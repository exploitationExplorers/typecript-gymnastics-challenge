# TypeScript 高级类型技巧

在掌握了 TypeScript 的基本类型和类型操作后，我们可以探索更高级的类型编程技巧。这些技巧将帮助你解决复杂的类型问题，创建更精确和强大的类型定义。

## 递归类型

递归类型是指在自身定义中引用自身的类型。这对于处理嵌套结构非常有用。

### 递归类型示例

**深度 Readonly 类型**：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P]
}

// 使用示例
interface NestedObject {
  a: {
    b: {
      c: number;
    };
    d: string;
  };
  e: boolean;
}

type ReadonlyNestedObject = DeepReadonly<NestedObject>;
```

**JSON 类型**：

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// 使用示例
const validJSON: JSONValue = {
  name: "John",
  age: 30,
  isAdmin: false,
  preferences: {
    darkMode: true,
    notifications: null
  },
  favoriteFoods: ["pizza", "sushi"]
};
```

## 分布式条件类型

当条件类型作用于联合类型时，它会分别应用于联合类型的每个成员，这称为分布式条件类型。

### 分布式条件类型工作原理

```typescript
type Distributed<T> = T extends any ? T[] : never;

type Result = Distributed<string | number>;
// 等价于: (string extends any ? string[] : never) | (number extends any ? number[] : never)
// 结果: string[] | number[]
```

### 实际应用

```typescript
// 从联合类型中提取特定类型
type ExtractType<T, U> = T extends U ? T : never;

type NumbersOrStrings = string | number | boolean | object;
type OnlyNumbers = ExtractType<NumbersOrStrings, number>; // number
type OnlyPrimitives = ExtractType<NumbersOrStrings, string | number | boolean>; // string | number | boolean
```

## 条件类型中的类型推导

我们可以在条件类型中使用 `infer` 关键字来推导和提取类型的一部分。

### 复杂类型推导示例

**提取函数参数类型**：

```typescript
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

function example(a: string, b: number, c: boolean): void {}
type ExampleParams = Parameters<typeof example>; // [string, number, boolean]
```

**提取构造函数参数类型**：

```typescript
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

class Example {
  constructor(a: string, b: number) {}
}
type ExampleConstructorParams = ConstructorParameters<typeof Example>; // [string, number]
```

**提取泛型参数**：

```typescript
type ExtractGenericParameter<T> =
  T extends Array<infer U> ? U :
    T extends Map<any, infer U> ? U :
      T extends Set<infer U> ? U :
        T extends Promise<infer U> ? U :
          never;

type T1 = ExtractGenericParameter<number[]>; // number
type T2 = ExtractGenericParameter<Map<string, boolean>>; // boolean
type T3 = ExtractGenericParameter<Set<Date>>; // Date
type T4 = ExtractGenericParameter<Promise<string>>; // string
```

## 高级类型技巧

### 类型收窄

有时候我们需要更精确地收窄类型，特别是在处理联合类型时：

```typescript
type NonEmptyArray<T> = [T, ...T[]];

function nonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0;
}

function firstElement<T>(arr: T[]): T | undefined {
  if (nonEmpty(arr)) {
    // 这里 arr 的类型被收窄为 NonEmptyArray<T>
    return arr[0]; // 不会报错
  }
  return undefined;
}
```

### 类型品牌化

为了防止类型兼容性问题，可以使用品牌化（Branded）类型：

```typescript
// 定义品牌类型
type Brand<T, B> = T & { __brand: B };

// 创建特定品牌类型
type USD = Brand<number, 'USD'>;
type EUR = Brand<number, 'EUR'>;

// 创建品牌化值
const usd = (value: number): USD => value as USD;
const eur = (value: number): EUR => value as EUR;

// 函数只接受特定品牌类型
function addDollars(a: USD, b: USD): USD {
  return (a + b) as USD;
}

// 使用
const dollars1 = usd(10);
const dollars2 = usd(20);
const euros = eur(10);

addDollars(dollars1, dollars2); // OK
// addDollars(dollars1, euros); // 类型错误: EUR 不能分配给 USD
```

### 数值运算类型

我们可以在类型系统中模拟一些简单的数值运算：

```typescript
// 加法
type Add<A extends number, B extends number> =
  [...Array<A>, ...Array<B>]['length'];

// 减法
type Subtract<A extends number, B extends number> =
  Array<A> extends [...Array<B>, ...infer R]
    ? R['length']
    : never;

// 乘法
type Multiply<A extends number, B extends number> =
  B extends 0
    ? 0
    : Add<A, Multiply<A, Subtract<B, 1>>>;

// 示例（仅适用于小数字）
type Result1 = Add<3, 4>; // 7
type Result2 = Subtract<5, 2>; // 3
type Result3 = Multiply<2, 3>; // 6
```

### 字符串操作类型

类型系统中也可以进行字符串操作：

```typescript
// 将字符串转换为联合类型
type StringToUnion<S extends string> =
  S extends `${infer C}${infer Rest}`
    ? C | StringToUnion<Rest>
    : never;

type T0 = StringToUnion<'hello'>; // 'h' | 'e' | 'l' | 'o'

// 字符串替换
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer L}${From}${infer R}`
      ? `${L}${To}${R}`
      : S;

type T1 = Replace<'hello world', 'world', 'TypeScript'>; // 'hello TypeScript'

// 字符串分割
type Split<S extends string, D extends string> =
  S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S];

type T2 = Split<'a,b,c', ','>; // ['a', 'b', 'c']
```

## 实用类型体操技巧

### 类型体操中的技巧和模式

1. **建立类型映射**：将一个域的值映射到另一个域的类型

```typescript
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type MethodHandler<M extends HTTPMethod> = {
  url: string;
  method: M;
  body: M extends 'GET' ? never : unknown;
  response: unknown;
}

type APIConfig = {
  [M in HTTPMethod]: MethodHandler<M>;
}
```

2. **使用泛型约束和默认类型**：

```typescript
// 默认泛型类型
type Container<T = string> = {
  value: T;
}

// 泛型约束
type NumberContainer<T extends number> = {
  value: T;
}
```

3. **累积类型模式**：构建复杂类型时使用辅助类型

```typescript
// 字符串转联合辅助递归类型
type StringToUnion<S extends string> =
  S extends `${infer F}${infer R}`
    ? F | StringToUnion<R>
    : never;
```

4. **提前返回模式**：在递归过程中检查基本情况

```typescript
type DeepReadonly<T> =
  T extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends Function
      ? T
      : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;
```

## 类型系统的限制

尽管 TypeScript 的类型系统非常强大，但它也有一些限制：

- 无法执行运行时计算
- 复杂的递归类型可能导致编译器错误或性能问题
- 类型推断在某些情况下可能不够精确
- 循环类型引用可能导致无限递归

在处理复杂类型时，尝试将问题分解为更小的类型单元，并测试每个部分是否按预期工作。

## 结论

TypeScript 的高级类型系统为我们提供了强大的工具来构建类型安全的代码。通过掌握这些高级类型技巧，你可以创建更精确、更易于维护的类型定义，更好地捕获潜在的错误，并为你的 IDE 提供更好的类型提示。

现在你已经掌握了 TypeScript 类型体操的基础知识和高级技巧，可以开始挑战本站上的[类型体操挑战](/challenges/)来测试和提升你的技能！
