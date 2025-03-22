# Implement Pick

## Challenge

Implement the built-in `Pick<T, K>` utility type without using it.

`Pick<T, K>` constructs a type by picking the set of properties `K` from `T`.

## Example

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

## Solution Approach

To implement the `Pick<T, K>` utility type, we need to create a new type that:
1. Takes two type parameters: `T` (the source object type) and `K` (the keys to pick)
2. Creates a new type that has only the properties from `T` that are specified in `K`

Let's break down the solution step by step:

### Step 1: Understanding Mapped Types

First, let's understand a similar operation, which is creating a type with all properties from another type:

```ts
type Copy<T> = {
  [P in keyof T]: T[P];
};

type Case1 = Copy<{ a: string; b: string }>;
```

Here, `keyof T` gives us all the keys of `T` as a union type, and `[P in keyof T]` iterates over each key to create a new property with the same type as in the original.

### Step 2: Implementing Pick

The difference with `Pick` is that we only want to include keys that are explicitly specified in the second type parameter:

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Example:
// type Case2 = { a: string, b: string }
type Case2 = MyPick<{ a: string; b: string; c: string }, 'a' | 'b'>;
```

The `K extends keyof T` constraint ensures that all keys in `K` exist in `T`. Then, `[P in K]` creates properties only for the keys specified in `K`.

### Key Points

1. The `[P in keyof T]: T[P]` syntax creates a new type with all properties from `T`.
2. The `[P in K]: T[P]` syntax creates properties only for the keys in `K`.
3. The `K extends keyof T` constraint ensures type safety by requiring all keys in `K` to be valid keys of `T`.

## Complete Implementation

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

This is a simple yet powerful example of how TypeScript's type system can be used to create useful utility types.
