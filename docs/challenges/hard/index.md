# 困难难度挑战

这些挑战需要对TypeScript类型系统有深入的理解，并且能够创造性地组合多种类型技术。挑战这一级别需要较强的思考能力和TypeScript类型系统经验。

## 挑战列表

### 1. 联合类型中的字符串字面量

**要求**：从联合类型 `T` 中提取出所有的字符串字面量类型。

**例子**：
```typescript
type T0 = string | number | boolean | null | undefined
type T1 = 'a' | 'b' | 'c' | 1 | 2 | true | false | null
type T2 = string | 'a' | 'b' | 'c'

type R0 = StringLiteral<T0> // never
type R1 = StringLiteral<T1> // 'a' | 'b' | 'c'
type R2 = StringLiteral<T2> // 'a' | 'b' | 'c'
```

**解决方案**：
```typescript
type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never
```

**解释**：
- 首先检查 `T` 是否可以赋值给 `string`
- 如果可以，再检查 `string` 是否可以赋值给 `T`
- 如果 `string` 可以赋值给 `T`，则 `T` 包含整个 `string` 类型，不是字面量类型，返回 `never`
- 如果 `string` 不能赋值给 `T`，则 `T` 是字符串字面量类型，返回 `T`
- 如果 `T` 不能赋值给 `string`，则 `T` 不是字符串类型，返回 `never`

---

### 2. CamelCase 转换

**要求**：实现 `CamelCase<T>` 类型，将蛇形命名字符串转换为驼峰命名。

**例子**：
```typescript
type camelCase1 = CamelCase<'hello_world'> // 'helloWorld'
type camelCase2 = CamelCase<'foo_bar_baz'> // 'fooBarBaz'
```

**解决方案**：
```typescript
type CamelCase<S extends string> = S extends `${infer P}_${infer Q}`
  ? `${P}${CamelCase<Capitalize<Q>>}`
  : S
```

**解释**：
- 使用模板字符串类型检查 `S` 是否包含下划线
- 如果包含，提取下划线前的部分 `P` 和下划线后的部分 `Q`
- 将结果构造为 `P` 连接上 `Q` 的首字母大写形式，并递归处理剩余部分
- 如果不包含下划线，直接返回原字符串

---

### 3. 实现 Currying 类型

**要求**：实现一个类型 `Currying`，将多参数函数转换为柯里化函数类型。

**例子**：
```typescript
type Fn = (a: number, b: string, c: boolean) => number

type CurriedFn = Currying<Fn>
// (a: number) => (b: string) => (c: boolean) => number
```

**解决方案**：
```typescript
type Currying<F> = F extends (...args: infer Args) => infer Return
  ? Args extends [infer First, ...infer Rest]
    ? (arg: First) => Currying<(...args: Rest) => Return>
    : Return
  : never
```

**解释**：
- 首先提取函数 `F` 的参数类型 `Args` 和返回类型 `Return`
- 检查参数数组是否可以分解为第一个参数 `First` 和剩余参数 `Rest`
- 如果可以，返回一个接收 `First` 的函数，该函数返回对剩余参数的柯里化函数
- 如果没有更多参数，直接返回原函数的返回类型 `Return`

---

### 4. 字符串连接

**要求**：实现一个类型 `Join<T, D>`，将字符串元组 `T` 中的元素用连接符 `D` 连接起来。

**例子**：
```typescript
type Result = Join<['a', 'p', 'p', 'l', 'e'], '-'> // 'a-p-p-l-e'
```

**解决方案**：
```typescript
type Join<T extends string[], D extends string> = T extends [infer F extends string, ...infer R extends string[]]
  ? R['length'] extends 0
    ? F
    : `${F}${D}${Join<R, D>}`
  : ''
```

**解释**：
- 检查元组 `T` 是否可以分解为第一个元素 `F` 和剩余元素 `R`
- 如果剩余元素数组长度为0，则只返回第一个元素
- 否则，返回第一个元素、连接符和对剩余元素递归调用 `Join` 的结果
- 如果输入是空数组，返回空字符串

---

我们会不断添加更多困难难度的挑战，请定期查看更新！

[返回挑战列表](/challenges/)
