/**
 * 如何使用映射类型删除索引签名
 * How to remove index signature using mapped types
 *
 * https://stackoverflow.com/questions/58216298/how-to-omit-keystring-any-from-a-type-in-typescript
 * https://stackoverflow.com/questions/51465182/how-to-remove-index-signature-using-mapped-types/51956054#51956054
 * https://stackoverflow.com/questions/51954558/how-can-i-get-a-union-of-just-the-known-property-keys-from-a-type-that-has-a-str/51955852#51955852
 */

/**
 * TypeScript 4.1+ [Key Remapping](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#key-remapping-mapped-types)
 *
 * 4.1 及以后用这个
 */
type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K];
};

/**
 * TypeScript 2.8's [Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types)
 *
 * 4.1 之前的版本用这个
 *
 * [broken since Typescript `4.3.1-rc`](https://github.com/microsoft/TypeScript/issues/44143)
 */
type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : symbol extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

type RemoveIndex4OldVersion<T extends Record<any, any>> = Pick<T, KnownKeys<T>>;

// ============================== example ==============================

interface Foo {
  [key: string]: any;
  [key: number]: any;
  [key: symbol]: any;
  bar(): void;
}

type FooWithOnlyBar = RemoveIndex<Foo>;
type FooWithOnlyBar4OldVersion = RemoveIndex4OldVersion<Foo>;
