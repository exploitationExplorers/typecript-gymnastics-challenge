---
title: 实现ReplaceKeys
---

# {{ $frontmatter.title }}

## 🎯 题目描述

Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments.

For example:

```ts
type NodeA = {
  type: 'A';
  name: string;
  flag: number;
};

type NodeB = {
  type: 'B';
  id: number;
  flag: number;
};

type NodeC = {
  type: 'C';
  name: string;
  flag: number;
};

type Nodes = NodeA | NodeB | NodeC;

type ReplacedNodes = ReplaceKeys<
  Nodes,
  'name' | 'flag',
  { name: number; flag: string }
>; // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', { aa: number }>; // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

## 🔍 分析

这个题目中，涉及到两个联合类型，一个是入参中待替换的对象，一个是计划替换的属性名，而要替换的属性值则集中放在第三个参数中。

假设前两个参数都不是联合类型，那么可以写出如下代码：

```ts
type ReplaceKeys<T, K, O> = {
  // 遍历所有属性，如果属性和 K 相同
  [P in keyof T]: P extends K
    ? // 判断 O 中是否存在 P
      P extends keyof O
      ? // 存在，就返回 O 中的类型
        O[P]
      : // 否则，返回 never
        never
    : // 否则返回原来的类型
      T[P];
};
```

但是由于题目中输入的是联合类型，故需要先触发联合类型的分发特性后，再执行上述操作。

## 🛠️ 题解

```ts
type ReplaceKeys<U, T, Y> = U extends any
  ? {
      [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
    }
  : never;
```

## 💡 知识点

1. 联合类型的分发特性
2. 对象的遍历套路 `[P in keyof T]: T[P]`