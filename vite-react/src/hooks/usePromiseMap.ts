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

// 为什么 Map 结构会有这个差异
// Array.from(promisesMap.values()).map(work => work());
