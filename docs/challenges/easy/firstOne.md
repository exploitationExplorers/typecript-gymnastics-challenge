---
title: 第一个元素
---

# {{ $frontmatter.title }}

## 🎯 题目描述

实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## 🔍 分析

这一题主要是围绕元组的，要获取元组的第一个，就必须要借助 ts 的 `infer` 了。

这一类题的套路都如下：`T extends [infer F, ...infer R] ? F : never`。

其本质可以说是模式匹配，如果 `T` 能够匹配上 `[infer F, ...infer R]`，那么就取前一个类型，否则走后者，基本逻辑和 js 中的三元表达式一样。

## 🛠️ 题解

了解了 infer 和 extends 用法后，其实答案也非常简单了：

```ts
type First<T extends any[]> = T extends [infer F, ...infer _] ? F : never;
```

这里值得一提的就是 `[] extends [infer F, ...infer R]` 的判断，由于有两个变量需要推断，`F` 和 `R`，但是原数组中一个元素都没有，此时就会走 false 的逻辑，返回 never。而如果有一个元素，那么还是会走 true 的逻辑，此时 `R` 会被推断为 `[]`。

## 💡 知识点

1. `xxx extends infer xxx ? A : B`，infer + extends 范式
2. `[infer F, ...infer R]` 中，如果 1 个元素都没有，那么走 false 的逻辑

## 其他解题思路

上面的解题思路是利用`infer`进行匹配, 还有一种完全不同的思路, 是利用元组的索引特性, 我们通过`T[number]`可以获取任意位置的元素, 还能通过`T['length']`获取元组的长度, 类比于 js 中国呢我们获取第一个元素的方式, 我们可以写出如下伪代码:

```ts
// 利用isEmpty判断数组是否为空
Array.isEmpty(arr) ? undefined : arr[0];

// 或者利用length判断数组是否为空
arr.length === 0 ? undefined : arr[0];
```

将上述伪代码改写成 typescript 类型版本:

```ts
type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

// 或者
type First<T extends any[]> = T extends [] ? never : T[0];
```