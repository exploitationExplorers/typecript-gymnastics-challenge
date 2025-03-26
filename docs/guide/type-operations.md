# TypeScript 类型操作

在掌握了 TypeScript 的基础类型后，我们需要学习如何操作和转换这些类型。这些类型操作是类型体操的核心技术。

## 类型操作的基本概念

类型操作允许我们基于现有类型创建新的类型。TypeScript 提供了多种方式来操作类型，包括：

- 映射类型
- 条件类型
- 索引访问类型
- 类型推断（infer）
- 模板字面量类型

## 映射类型

映射类型允许你基于旧类型创建新类型，通过遍历旧类型的所有属性并依照一定规则进行转换。

### 基本语法

```typescript
type MappedType<T> = {
  [P in keyof T]: TransformedType
}
```

### 常见映射类型示例

**将对象所有属性设为只读**：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// 等价于
type ReadonlyUser = {
  readonly id: number;
  readonly name: string;
}
```

**将对象所有属性设为可选**：

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

interface User {
  id: number;
  name: string;
}

type PartialUser = Partial<User>;
// 等价于
type PartialUser = {
  id?: number;
  name?: string;
}
```

**从对象中选择一部分属性**：

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface User {
  id: number;
  name: string;
  email: string;
}

type UserBasic = Pick<User, 'id' | 'name'>;
// 等价于
type UserBasic = {
  id: number;
  name: string;
}
```

### 修饰符

映射类型可以添加或删除特定修饰符：

```typescript
// 添加 readonly 修饰符
type ToReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 移除 readonly 修饰符
type FromReadonly<T> = {
  -readonly [P in keyof T]: T[P]
}

// 添加可选修饰符
type ToOptional<T> = {
  [P in keyof T]?: T[P]
}

// 移除可选修饰符
type FromOptional<T> = {
  [P in keyof T]-?: T[P]
}
```

## 条件类型

条件类型允许你根据一个条件来选择不同的类型。

### 基本语法

```typescript
type ConditionalType<T> = T extends Condition ? TrueType : FalseType
```

### 条件类型示例

**从联合类型中排除某些类型**：

```typescript
type Exclude<T, U> = T extends U ? never : T

type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<string | number | boolean, string>; // number | boolean
```

**提取匹配的类型**：

```typescript
type Extract<T, U> = T extends U ? T : never

type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | boolean, boolean | number>; // number | boolean
```

**获取函数返回类型**：

```typescript
type ReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : any

function foo() { return { a: 1, b: 2 }; }
type FooReturn = ReturnType<typeof foo>; // { a: number, b: number }
```

## 类型推断 (infer)

`infer` 关键字允许你在条件类型中推断类型，并在 true 分支中引用该类型。

### infer 基本用法

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// 例子
function foo() { return 42; }
type FooReturnType = GetReturnType<typeof foo>; // number
```

### 推断数组元素类型

```typescript
type ArrayElementType<T> = T extends (infer E)[] ? E : never

type T1 = ArrayElementType<number[]>; // number
type T2 = ArrayElementType<string[]>; // string
type T3 = ArrayElementType<[number, string]>; // number | string
```

### 推断 Promise 值类型

```typescript
type PromiseValueType<T> = T extends Promise<infer V> ? V : never

type T1 = PromiseValueType<Promise<string>>; // string
type T2 = PromiseValueType<Promise<number>>; // number
```

## 索引访问类型

索引访问类型允许你通过索引来访问其他类型的特定部分。

### 基本语法

```typescript
type PropertyType<T, K extends keyof T> = T[K]
```

### 示例

```typescript
interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  }
}

type PersonName = Person['name']; // string
type PersonNameOrAge = Person['name' | 'age']; // string | number
type PersonAddress = Person['address']; // { city: string; country: string; }
type AddressProperty = Person['address']['city']; // string
```

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型，允许你通过模板字符串的方式构建新的字符串字面量类型。

### 基本语法

```typescript
type TemplateLiteralType<T extends string, U extends string> = `${T}${U}`
```

### 示例

```typescript
type Direction = 'top' | 'right' | 'bottom' | 'left';
type Position = 'start' | 'center' | 'end';

type EdgePosition = `${Direction}-${Position}`;
// 'top-start' | 'top-center' | 'top-end' | ... 其他组合
```

### 与映射类型结合使用

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }
```

## 高级类型工具

掌握上面的基本类型操作后，我们可以创建更复杂的类型工具：

### DeepReadonly

递归地将对象所有属性设为只读：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P]
}
```

### DeepPartial

递归地将对象所有属性设为可选：

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P]
}
```

### Flatten

扁平化嵌套对象的类型，使用路径作为键：

```typescript
type Flatten<T extends object, Prefix extends string = ''> = {
  [K in keyof T as T[K] extends object
    ? never
    : `${Prefix}${string & K}`]: T[K]
} & (
  {
    [K in keyof T as T[K] extends object
      ? `${Prefix}${string & K}`
      : never]: T[K] extends object ? Flatten<T[K], `${Prefix}${string & K}.`> : never
  }
)
```

掌握了这些核心类型操作，你就可以开始挑战本站上的[类型体操挑战](/challenges/)，继续深入学习[高级技巧](/guide/advanced)。
