---
title: 实现Promise.all
---

# {{ $frontmatter.title }}

## 🎯 题目描述

键入函数`PromiseAll`，它接受 PromiseLike 对象数组，返回值应为`Promise<T>`，其中`T`是解析的结果数组。

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```

## 🔍 分析

这一题可以遍历整个元组，并将元组中的每一个元素通过之前实现的 [Awaited](../easy/awaited.md) 转换一下即可。

元组的遍历基本上有三种方式：

1. 索引签名：`T[number]`，这种方式会得到元组类型组合成的联合类型
2. 匹配推断: `T extends [infer F, ...infer R]`
3. 类似对象的遍历方式：`{ [P in keyof T]: T[P] }`

这一题明显使用方式三即可。基本可以非常轻易的写出如下代码：

```ts
type MyAwaited<T> = T extends Promise<infer X> ? X : T;

declare function PromiseAll<T>(values: T): Promise<{
  [P in keyof T]: MyAwaited<T[P]>;
}>;
```

但是对于用例，都无法覆盖到：

```ts
// Promise<readonly [1, 2, 3]>
const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
// Promise<readonly [1, 2, number]>
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
// Promise<number []>
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
// Promise<number []>
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
];
```

上述的 case 中， case1 和 case2 由于遍历元组的时候，把 readonly 的属性也拷贝出来导致和预期不一致。

而 case3 输出的 `Promise<number []>` 是由于 ts 的默认类型推断始终是计算一个更通用的类型。可以参考官网 Type Inference。所以推断成了 `Promise<number[]>`。

而 case4 并没有走 ts 的类型推断，而是直接指明了泛型 T，所以能够通过用例。

所以当下要解决的就是对 修饰符 以及 ts 默认的类型推断规则。

修饰符比较好处理，只需要遍历的时候去除 readonly 即可，

```ts
type MyAwaited<T> = T extends Promise<infer X> ? X : T;

declare function PromiseAll<T>(values: T): Promise<{
  -readonly [P in keyof T]: MyAwaited<T[P]>;
}>;
```

此时 case1 和 case2 即可满足，但是 case3 由于 ts 的 infer 总是尝试计算一个更通用的类型而导致失败。故只能从参数推断的地方入手。直接看题解来的直观一点。

## 🛠️ 题解

```ts
declare function PromiseAll<T extends any[]>(
  // 核心：通过 [...T] 来去除 ts 对元组的更通用类型的推断，只尝试将元组内的类型进行类型推断
  // readonly 是因为 [...T] 时丢失了元组中 readonly 的属性，统一加回去，此时入参才可以满足类型要求
  values: readonly [...T],
): Promise<{
  [P in keyof T]: MyAwaited<T[P]>;
}>;
```

核心就在于 `[...T]` 去除 ts 对元组的推断，只推断元组内的元素类型，此时 `[1, 2, 3]` 会推断成 `[number, number, number]` 而不是 `number[]`， 而 `[1, 2, 3] as const` 会推断为 `[1, 2, 3]`。

而加了该判断后，由于丢失了 `readonly`，所以当入参是 `[1, 2, 3] as const` 时，就会提示类型错误，此时再加上 `readonly` 修饰符即可。

同时由于推断出来的类型，属性中并没有 `readonly` 修饰符，所以也不需要在遍历时去掉 `readonly` 修饰符

## 💡 知识点

1. ts 类型推断时，会尝试计算一个更通用的类型，比如 `[1, 2, 3]` 就会被推断成 `number[]`。这里要注意此处的类型推断是指的 ts 中的隐式类型推断，和 `A extends infer xxx` 还是不一样的。这种隐式类型推断一般发生在 `const a = [1, 2, 3] -> a = number[]` 以及函数的入参中
2. 同 [Awaited](../easy/awaited.md)