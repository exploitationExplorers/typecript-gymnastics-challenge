---
title: 实现Readonly
---

# {{ $frontmatter.title }}

## 🎯 题目描述

不要使用内置的 `Readonly<T>`，自己实现一个。

该 `Readonly` 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。

也就是不可以再对该对象的属性赋值。

例如：

```ts
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
```

## 🔍 分析

这一题，本质也是对对象类型进行遍历，然后为每一个属性增加 `readonly` 的修饰符，只需要在遍历的时候为每一个属性增加只读修饰符。

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 🛠️ 题解

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 💡 知识点

1. `[P in keyof T]` 遍历 对象类型(数组也是对象)
2. `readonly` 增加修饰符即可

