---
title: 最后一个元素
---

# {{ $frontmatter.title }}

## 🎯 题目描述

实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

## 🔍 分析

这个题其实和 [第一个元素](../easy/firstOne.md) 非常类似，合理利用扩展操作符，就可以解决。

```ts
type Last<T extends any[]> = T extends [...infer _, infer R] ? R : never;
```

由于扩展操作符的位置在前面，所以 R 总会推断出最后一个元素，对于元素数量不足一个的情况，会直接走 never 逻辑。

## 🛠️ 题解

```ts
type Last<T extends any[]> = T extends [...infer _, infer R] ? R : never;
```

## 💡 知识点

1. 同 [第一个元素](../easy/firstOne.md)