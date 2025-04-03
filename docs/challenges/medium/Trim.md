---
title: 实现Trim
---

# {{ $frontmatter.title }}

## 🎯 题目描述

实现`Trim<T>`，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '>; // expected to be 'Hello World'
```

## 🔍 分析

这个题目其实和上一题比较类似，只是需要把两边的空白字符都去掉。

思路也很简单，先递归去除左侧的空白，再去除右侧的即可。

```ts
type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : T;

type TrimRight<T extends string> = T extends `${infer R}${' ' | '\n' | '\t'}`
  ? TrimRight<R>
  : T;

type Trim<T extends string> = TrimRight<TrimLeft<T>>;
```

## 🛠️ 题解

当然，除了上述方案，还有更简单的方法：

```ts
type Trim<S extends string> = S extends
  | `${' ' | '\n' | '\t'}${infer M}`
  | `${infer M}${' ' | '\n' | '\t'}`
  ? Trim<M>
  : S;
```

本质就是把两次判断合并到一次了，并无实质区别。

## 💡 知识点

1. 同 [TirmLeft](/medium/实现TrimLeft.md)