# Get Return Type

## Challenge

Implement the built-in `ReturnType<T>` utility type without using it.

`ReturnType<T>` extracts the return type of a function type.

## Example

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be type "1 | 2"
```

## Solution Approach

To implement the `ReturnType<T>` utility type, we need to:

1. Create a type that extracts the return type from a function signature
2. Use conditional types and the `infer` keyword to extract the return type

Let's break down the solution step by step:

### Step 1: Understanding Conditional Types and Type Inference

TypeScript's conditional types allow us to perform type selection based on a condition. The `infer` keyword within conditional types allows us to extract parts of a type.

Here's the basic pattern for conditional types:

```ts
type SomeType<T> = T extends SomePattern ? TrueResult : FalseResult;
```

### Step 2: Using `infer` to Extract Return Type

To extract the return type of a function, we can use `infer` within a conditional type:

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

In this implementation:

- `T extends (...args: any[]) => infer R` checks if `T` is a function type
- `(...args: any[])` matches any function parameters
- `infer R` instructs TypeScript to infer the return type and store it in type variable `R`
- If the condition is true, we return the inferred return type `R`
- If the condition is false (meaning `T` is not a function type), we return `never`

### Key Points

1. The `infer` keyword is a powerful tool for extracting parts of complex types.
2. We use `(...args: any[])` as a pattern that matches any function parameters, regardless of their number or types.
3. The `never` type is used as a fallback when the input is not a function type.

## Complete Implementation

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

Let's see some examples of how this works:

```ts
// Example 1: Function returning a number
type Test1 = MyReturnType<(a: number) => number>; // number

// Example 2: Function returning different types based on condition
function example(x: boolean) {
  return x ? "hello" : 42;
}
type Test2 = MyReturnType<typeof example>; // string | number

// Example 3: Function returning void
type Test3 = MyReturnType<() => void>; // void

// Example 4: Not a function
type Test4 = MyReturnType<number>; // never
```

This implementation demonstrates how TypeScript's type system can be used to analyze and extract information from function types.
