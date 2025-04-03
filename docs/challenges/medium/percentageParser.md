---
title: 百分比解析器
---

# {{ $frontmatter.title }}

## 🎯 题目描述

实现类型 `PercentageParser<T extends string>`。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。

匹配的结果由三部分组成，分别是：`` [`正负号`, `数字`, `单位`] ``，如果没有匹配，则默认是空字符串。

例如：

```ts
type PString1 = '';
type PString2 = '+85%';
type PString3 = '-85%';
type PString4 = '85%';
type PString5 = '85';

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]
```

## 🔍 分析

这个题目本质还是利用字符的匹配推断即可解决，由于输出结果固定为 3 个元素，那么可以直接拆成 3 次匹配，分别匹配符号、内容和 % 号即可。

## 🛠️ 题解

```ts
type P1<T extends string> = T extends `${infer F extends '+' | '-'}${infer R}`
  ? F
  : '';

type P2<T extends string> = T extends `${infer F extends '+' | '-'}${infer M}%`
  ? M
  : T extends `${infer F extends '+' | '-'}${infer M}`
  ? M
  : T extends `${infer M}%`
  ? M
  : T;

type P3<T extends string> = T extends `${string}%` ? '%' : '';

type PercentageParser<T extends string> = [P1<T>, P2<T>, P3<T>];
```

可以看出来，符号和 % 号很容易判别，但是中间内容区域，确实判定起来比较麻烦，需要判断有无 +-，有无 % 后，才能得到最后的结果

## 💡 知识点

1. 字符匹配推断，`` A extends `${infer F}${infer R}%`  ``