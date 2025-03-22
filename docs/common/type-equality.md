# Type Equality in TypeScript

Determining if two types are exactly the same is a common challenge in TypeScript and is essential for creating robust type utilities.

## The Problem

At first glance, it might seem like we could simply use conditional types to check if types are equal:

```ts
type EqualV1<A, B> = A extends B ? (B extends A ? true : false) : false;
```

However, this approach has several issues when dealing with certain TypeScript types:

## Examples of Edge Cases

```ts
// Case 1: Using 'never'
type Case1 = EqualV1<never, 1>; // Evaluates to 'never', not 'false' as expected

// Case 2: Using 'any'
type Case2 = EqualV1<any, 1>; // Evaluates to 'boolean' (true | false), not a specific value

// Case 3: Union types
type Case3 = EqualV1<'a' | 'b', 'a' | 'b'>; // This can be problematic with union distribution
```

## Solution 1: Using Arrays to Prevent Distribution

One approach to solve these issues is to wrap types in arrays to prevent conditional type distribution:

```ts
type EqualV2<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

// Now with our problematic cases:
type Test1 = EqualV2<never, never>; // true
type Test2 = EqualV2<any, 1>; // true (because [any] extends [1] is true)
type Test3 = EqualV2<'a' | 'b', 'a' | 'b'>; // true
```

This approach handles `never` correctly but still has issues with `any` and some other edge cases.

## Special Cases: readonly, optional, and object merges

The above solutions might still have issues with:

```ts
// Optional properties
type Case5 = EqualV2<
  { a: 'a' },
  { a?: 'a' }
>; // false (as expected)

// Identical optional properties
type Case6 = EqualV2<
  { a?: 'a' },
  { a?: 'a' }
>; // true (as expected)

// Readonly
type Case7 = EqualV2<
  { readonly a: 'a' },
  { a: 'a' }
>; // false or true depending on implementation
```

## The Definitive Solution

The most reliable approach comes from a [TypeScript GitHub issue](https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650):

```ts
export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;
```

This solution leverages function types and how TypeScript compares them. It's the most robust way to check type equality.

## Examples

```ts
// Object vs intersections
type Case1 = Equals<
  { a: 'a'; b: 'b' },
  { a: 'a' } & { b: 'b' }
>; // false - TypeScript sees these as structurally different

// Using a helper to normalize merged types
type Merge<T> = { [P in keyof T]: T[P] };

type Case2 = Equals<
  { a: 'a'; b: 'b' },
  Merge<{ a: 'a' } & { b: 'b' }>
>; // true - after merging they are identical
```

## Key Takeaways

1. Simple conditional types aren't sufficient for reliable type equality
2. Edge cases like `never`, `any`, and object shapes need special handling
3. Using function types is the most reliable approach for type equality
4. Sometimes you need to normalize complex types before comparing them

This technique is essential for building advanced type utilities that need to make decisions based on type equality.
