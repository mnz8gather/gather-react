/** 判断两个类型是否相等 */
export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T1>() => T1 extends B ? 1 : 2 ? true : false;

/**
 * 提取对象类型 T 的所有值类型
 *
 * 感觉作用有限，使用时也要注意输入的 T
 *
 * `ObjectValueType<string>` -> 一堆东西
 *
 * `ObjectValueType<null>` -> `null`
 */
export type ObjectValueType<T> = T[keyof T];
