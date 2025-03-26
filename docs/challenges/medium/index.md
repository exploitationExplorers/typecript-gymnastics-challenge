# 中等难度挑战

这些挑战需要对TypeScript类型系统有更深入的了解。您将学习更多高级类型操作和技巧。

## 挑战列表

### 1. 获取函数返回类型

**要求**：不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 工具类型。

**例子**：
```typescript
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // 应该是 1 | 2
```

**解决方案**：
```typescript
type MyReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : never
```

**解释**：
- `T extends (...args: any[]) => any` 约束输入类型必须是函数
- `infer R` 使用推断关键字从函数返回类型中推断出类型变量 R
- 整个条件类型返回推断出的返回类型 R，如果 T 不是函数则返回 never

---

### 2. 深度 Readonly

**要求**：实现一个通用的 `DeepReadonly<T>` 工具类型，它将对象的每个参数及其子对象递归地设为只读。

**例子**：
```typescript
type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

**解决方案**：
```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P]
}
```

**解释**：
- `[P in keyof T]` 遍历 T 类型中的所有属性
- `readonly` 修饰符使所有属性变为只读
- 对于每个属性，检查它是否是对象（不包括函数）
- 如果是普通对象，则递归应用 DeepReadonly
- 如果是函数或基本类型，则保持原样

---

### 3. 元组转合集

**要求**：实现泛型 `TupleToUnion<T>`，将元组类型转换为元组所有值的合集。

**例子**：
```typescript
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

**解决方案**：
```typescript
type TupleToUnion<T extends any[]> = T[number]
```

**解释**：
- `T extends any[]` 约束输入类型必须是数组/元组
- `T[number]` 是 TypeScript 的索引访问类型，它会获取元组/数组中所有元素类型的联合

---

### 4. Promise 类型提取

**要求**：从 Promise 对象中提取类型

**例子**：
```typescript
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

**解决方案**：
```typescript
type MyAwaited<T extends PromiseLike<any>> =
  T extends PromiseLike<infer U>
    ? U extends PromiseLike<any>
      ? MyAwaited<U>
      : U
    : never
```

**解释**：
- `T extends PromiseLike<any>` 约束输入类型必须是类 Promise 对象
- `infer U` 推断 Promise 包含的类型为 U
- 检查 U 是否也是 Promise，如果是则递归执行 MyAwaited
- 否则直接返回 U 作为结果

---

我们会不断添加更多中等难度的挑战，请定期查看更新！

[返回挑战列表](/challenges/)
