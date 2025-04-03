---
title: AnyOf
---

# {{ $frontmatter.title }}

## 🎯 题目描述

在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

例如：

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be false.
```

## 🔍 分析

这个题目看起来只需要遍历一次元组，遇到 false 元素，就继续递归判断剩余元素，否则就返回 true，直到遍历结束，那么就返回 false。

所以问题就转换问，怎么判断一个元素为 false，从这道题目的 case 中推断，可以认为：

`0 | false | '' | [] | undefined | null | {}` 是 false。

可以通过定义一个 Zerolist 的类型，`A extends Zerolist` 就简单认为这个元素是 false。

## 🛠️ 题解

```ts
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

type Zerolist = 0 | false | '' | [] | undefined | null;

type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? F extends Zerolist
    ? AnyOf<R>
    : // 单独处理 {} 的判定
    Equal<F, {}> extends true
    ? AnyOf<R>
    : true
  : false;
```

## 💡 知识点

1. `[] ｜ Function | { a: any } extends {}` 为 true