# 实现 Pick

## 挑战

不使用内置的 `Pick<T, K>` 泛型，实现自己的 `MyPick<T, K>` 工具类型。

`Pick<T, K>` 能从对象类型 `T` 中选取指定属性 `K` 来构造新的类型。

## 示例

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>
// 应该等价于: { title: string; completed: boolean }
```

## 解题思路

要实现 `MyPick<T, K>` 类型，我们需要：

1. 创建一个新的类型，它只包含 `T` 中那些键名存在于 `K` 中的属性
2. 使用 TypeScript 的映射类型来实现键的过滤和选择

让我们逐步分析解决方案：

### 步骤 1: 理解映射类型

TypeScript 的映射类型允许我们基于旧类型创建新类型，同时对每个属性应用转换：

```typescript
type MappedType<T> = {
  [P in keyof T]: T[P];
};
```

### 步骤 2: 添加约束条件

我们需要确保 `K` 只能是 `T` 的键的子集。使用 TypeScript 的 `extends` 约束可以实现：

```typescript
type MyPick<T, K extends keyof T> = {
  // 待完成
};
```

### 步骤 3: 使用映射类型仅选择 K 中的键

我们可以使用映射类型，但只遍历 `K` 中的键，而不是 `T` 中的所有键：

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## 完整实现

下面是 `MyPick<T, K>` 的完整实现：

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

让我们验证这个实现是否符合我们的预期：

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// 示例 1: 选择单个属性
type TodoTitle = MyPick<Todo, 'title'>;
// { title: string }

// 示例 2: 选择多个属性
type TodoPreview = MyPick<Todo, 'title' | 'completed'>;
// { title: string; completed: boolean }

// 示例 3: 属性必须是存在于对象中的键
// 下面这行会报错，因为 'missing' 不是 Todo 的有效键
// type Invalid = MyPick<Todo, 'title' | 'missing'>;
```

## 知识点

1. **泛型**：泛型允许我们创建可重用的类型组件，在这里我们使用泛型 `T` 和 `K` 来表示输入类型和要选择的键。

2. **映射类型**：映射类型让我们能够从一个类型中创建新类型，通过遍历原类型的键来转换它们。

3. **keyof 操作符**：`keyof T` 操作符返回类型 `T` 的所有公共属性键的联合类型。

4. **索引访问类型**：`T[P]` 语法用于访问类型 `T` 中键 `P` 对应的值的类型。

5. **extends 约束**：`K extends keyof T` 确保 `K` 只能是 `T` 的键的子集，提供了类型安全。

通过实现这个类型，我们加深了对 TypeScript 类型系统核心概念的理解：泛型、映射类型和类型约束。
