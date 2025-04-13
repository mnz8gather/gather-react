import { useRef, useCallback } from 'react';

interface PromiseWork<T> {
  (): Promise<T>;
}

interface PromiseRegister<T> {
  (promiseWork: PromiseWork<T>): () => void;
}

/**
 * 注册多个 promise
 *
 * 用处：执行多个 promise, 同时不需要区分每个 promise
 *
 * @example
 * ```ts
 * const [promiseRegister, promisesRef] = usePromiseArray();
 * ```
 */
export function usePromiseArray<T>() {
  const promisesRef = useRef<PromiseWork<T>[]>([]);

  /**
   * @param promiseWork 执行任务的函数
   * @returns 返回移除 promiseWork 的函数
   */
  const promiseRegister: PromiseRegister<T> = useCallback((promiseWork) => {
    promisesRef.current.push(promiseWork);
    return () => {
      // 当组件卸载时，移除这个 promiseWork
      const index = promisesRef.current.indexOf(promiseWork);
      if (index > -1) {
        promisesRef.current.splice(index, 1);
      }
    };
  }, []);

  return [promiseRegister, promisesRef] as const;
}
