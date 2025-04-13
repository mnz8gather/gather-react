import { useRef, useCallback } from 'react';

interface PromiseWork<T> {
  (): Promise<T>;
}

interface PromiseRegister<T> {
  (promiseId: string, promiseWork: PromiseWork<T>): () => void;
}

/**
 * 注册多个 promise
 *
 * 用处：执行多个 promise, 并且可以区分每一个
 *
 * @example
 * ```ts
 * const [promiseRegister, promisesRef] = usePromiseMap();
 * ```
 */
export function usePromiseMap<T>() {
  const promisesRef = useRef<Map<string, PromiseWork<T>>>(new Map());

  /**
   * @param promiseWork 执行任务的函数
   * @returns 返回移除 promiseWork 的函数
   */
  const promiseRegister: PromiseRegister<T> = useCallback((promiseId, promiseWork) => {
    promisesRef.current.set(promiseId, promiseWork);
    return () => {
      // 当组件卸载时，移除这个 promiseWork
      promisesRef.current.delete(promiseId);
    };
  }, []);

  return [promiseRegister, promisesRef] as const;
}

// promisesMap.values().map(work => work()) // Error
// 为什么 Map 结构会有这个差异
// Array.from(promisesMap.values()).map(work => work());

// Map.prototype.values() 方法返回的是一个 MapIterator 对象，它是一个迭代器（Iterator），而不是数组。
// 迭代器对象只实现了迭代器协议（Iterator protocol），
// 它有 next() 方法和 [Symbol.iterator]() 方法，但没有数组的 map()、filter() 等方法。
// 这种设计是有意的，因为迭代器是惰性求值的（lazy evaluation），
// 这在处理大量数据时可以提高性能，而数组是立即求值的（eager evaluation）。
// 当你确实需要数组方法时，可以通过上述方式显式地进行转换。

// 1. 使用 Array.from() 将迭代器转换为数组：
// Array.from(promisesMap.values()).map(...)
// 2. 使用展开运算符（spread operator）转换为数组：
// [...promisesMap.values()].map(...)
// 展开运算符 [...iterator]：性能稍好一些
// Array.from(iterator)：性能略逊于展开运算符。更灵活，因为它可以接受第二个参数作为映射函数

// 使用展开运算符后再map
// [...promisesMap.values()].map(x => x * 2)
// 使用Array.from的映射功能，一步完成
// Array.from(promisesMap.values(), x => x * 2)
// Array.from() 的方式实际上会更高效，因为它避免了创建中间数组。
