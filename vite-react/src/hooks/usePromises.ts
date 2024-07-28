import { useRef, useCallback } from 'react';

/**
 * 注册多个 promise
 * @example
 * ```ts
 * ```
 */
export function usePromises<T>() {
  const promiseRef = useRef<(() => Promise<T>)[]>([]);

  /**
   * @param promiseWork 执行任务的函数
   * @returns 返回移除 promiseWork 的函数
   */
  const registerPromise = useCallback((promiseWork: () => Promise<T>) => {
    promiseRef.current.push(promiseWork);
    return () => {
      // 当组件卸载时，移除这个 promiseWork
      const index = promiseRef.current.indexOf(promiseWork);
      if (index > -1) {
        promiseRef.current.splice(index, 1);
      }
    };
  }, []);

  return [registerPromise, promiseRef];
  // return [registerPromise, promiseRef] as const;
}
