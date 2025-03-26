# 简单难度挑战

这些挑战适合TypeScript初学者，帮助你理解TypeScript的基本类型系统概念。

## 挑战列表

### 1. Pick<T, K>

**要求**：实现 TypeScript 的 `Pick<T, K>` 工具类型。

**例子**：
```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>
// 应该等于: { title: string; completed: boolean }
```

**解决方案**：
```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**解释**：
- `K extends keyof T` 确保 K 中的每个键都存在于 T 中
- `[P in K]` 遍历 K 类型中的所有属性
- `T[P]` 通过索引访问获取 T 中对应属性的类型

---

### 2. Readonly<T>

**要求**：实现 TypeScript 的 `Readonly<T>` 工具类型。

**例子**：
```typescript
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // 错误: 无法分配到 'title' 因为它是只读属性
todo.description = "barFoo" // 错误: 无法分配到 'description' 因为它是只读属性
```

**解决方案**：
```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

**解释**：
- `[P in keyof T]` 遍历 T 类型中的所有属性
- `readonly` 修饰符使所有属性变为只读
- `T[P]` 保持原有属性的类型不变

---

### 3. Tuple to Object

**要求**：给定一个元组类型，将它转换为对象类型，其属性键为元组元素的字面量类型，属性值为对应元素类型。

**例子**：
```typescript
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type Result = TupleToObject<typeof tuple>
// 预期结果: { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }
```

**解决方案**：
```typescript
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```

**解释**：
- `T extends readonly any[]` 约束输入类型必须是只读元组/数组
- `T[number]` 获取元组中所有元素的联合类型
- `[P in T[number]]: P` 遍历这个联合类型，将每个元素作为键和值创建对象属性

---

我们会不断添加更多简单难度的挑战，请定期查看更新！

[返回挑战列表](/challenges/)
