# Implement Readonly

## Challenge

Implement the built-in `Readonly<T>` utility type without using it.

`Readonly<T>` constructs a type with all properties of `T` set to readonly, meaning the properties cannot be reassigned.

## Example

```ts
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
};

todo.title = "Hello"; // Error: Cannot assign to 'title' because it is a read-only property.
todo.description = "barfoo"; // Error: Cannot assign to 'description' because it is a read-only property.
```

## Solution Approach

To implement the `Readonly<T>` utility type, we need to create a new type that:
1. Takes a type parameter `T` (the source object type)
2. Creates a new type with all properties from `T` but marked as readonly

Let's break down the solution step by step:

### Step 1: Understanding the `readonly` Modifier

In TypeScript, we can use the `readonly` modifier to make properties read-only:

```ts
interface Person {
  readonly name: string;
  age: number;
}

const person: Person = {
  name: "John",
  age: 30
};

// This is not allowed:
// person.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property.

// This is allowed:
person.age = 31;
```

### Step 2: Using Mapped Types to Make All Properties Readonly

We can use a mapped type to iterate over all properties of `T` and mark each one as `readonly`:

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

In this implementation:
- `keyof T` gives us all the keys of `T` as a union type
- `[P in keyof T]` iterates over each key
- `readonly` prefix marks each property as read-only
- `T[P]` preserves the original type of each property

### Key Points

1. The `readonly` modifier in TypeScript prevents reassignment of properties.
2. Using mapped types with `readonly` allows us to create a type where all properties are read-only.
3. This pattern is commonly used when you want to enforce immutability in your data structures.

## Complete Implementation

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

With this implementation, all properties of the original type `T` are preserved with their original types, but they cannot be reassigned after the object is created.
