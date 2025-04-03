---
title: 元组转换为对象
---

# {{ $frontmatter.title }}

## 🎯 题目描述

传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

// expected { tesla: 'tesla', 'model 3': 'model 3',
// 'model X': 'model X', 'model Y': 'model Y' }
type result = TupleToObject<typeof tuple>;
```

## 🔍 分析

此题目标是生成一个新的对象类型，其键值和属性值就是传入的元组的每一项的值，在前面的题目中我们了解了遍历一个对象的方法，加以改动，就可以改为生成一个对象的方法，如下，给定一个联合类型 `'a' | 'b'`，生成一个新的对象：

```ts
// PropertyKey 是 ts 内置类型：type PropertyKey = string | number | symbol
type Test<K extends PropertyKey> = {
  [P in K]: P;
};

// ['a']: 'a'
// ['b']: 'b'
// Case1 = { a: 'a', b: 'b' }
type Case1 = Test<'a' | 'b'>;
```

目前就比较接近了，但是题目给的是元组，所以需要把元组转换成联合类型，可以使用官方提供的 `T[number]` 写法，即可将元组转换为联合类型，

```ts
type Tuple = [string, number];

type Case2 = Tuple[number]; // string | number
```

```ts
// 平时工作中经常在不清楚全部属性名称的时候，会 [key: string] 来代替具体的属性名称
type MyObject<T> = {
  [key: string]: T;
};

// Case1 = T = number | string
type Case1 = MyObject<number | string>[string];
```

而数组的 `T[number]` 访问与此类似：

```ts
// 类数组的类型声明
type MyArrayLike<T> = {
  [key: number]: T;
};
// MyArrayLike<string> 的属性有 number
// 所以可以通过索引签名访问的特性访问到 MyArrayLike<string>[number]
type Case3 = ArrayLike<string>[number];
```

## 🛠️ 题解

了解了元组转为联合类型的方法后，答案也就呼之欲出了：

```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P;
};
```

这里也是，需要对输入的元组进行类型限制，其元素必须是 `PropertyKey`(ts 内置类型: `type PropertyKey = string | number | symbol`)。

## 💡 知识点

1. `T[number]` 索引签名访问，元组转联合类型