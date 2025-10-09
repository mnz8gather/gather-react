import { useCallback, useRef, useImperativeHandle, forwardRef, useEffect, ForwardRefRenderFunction } from 'react';

interface ParentComponentProps {}

export interface ParentComponentActions {
  triggerActionsAndGetResults: () => Promise<string[]>;
}

/**
 * ref 的一个妙用
 *
 * 没妙成 childPromiseRefs 存在多个（数组是 3，ref 数组是 6）的情况
 *
 * 妙成了
 *
 * 详细使用可以参考 react-vite\src\scene\Low\index.tsx
 */
const InnerMagicalEffect: ForwardRefRenderFunction<ParentComponentActions, ParentComponentProps> = (props, ref) => {
  const childPromiseRefs = useRef<(() => Promise<string>)[]>([]);

  const registerChildPromise = useCallback((promiseFunc: () => Promise<string>) => {
    childPromiseRefs.current.push(promiseFunc);
    return () => {
      // 当组件卸载时，移除这个 promiseFunc
      const index = childPromiseRefs.current.indexOf(promiseFunc);
      if (index > -1) {
        childPromiseRefs.current.splice(index, 1);
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    triggerActionsAndGetResults: async () => {
      console.debug('childPromiseRefs', childPromiseRefs);
      // 触发所有子组件的 Promise 函数，收集 Promise
      const promises = childPromiseRefs.current.map((promiseFunc) => promiseFunc());

      // 等待所有 Promise 完成
      const results = await Promise.all(promises);
      console.debug('All children have reported:', results);
      return results;
    },
  }));

  return (
    <div>
      {[1, 2, 3].map((_, i) => (
        <ChildComponent key={i} registerPromise={registerChildPromise} />
      ))}
    </div>
  );
};

export const MagicalEffect = forwardRef(InnerMagicalEffect);

interface ChildComponentProps {
  registerPromise: (promiseFunc: () => Promise<string>) => () => void;
}

const ChildComponent = ({ registerPromise }: ChildComponentProps) => {
  useEffect(() => {
    const doWork = () =>
      new Promise<string>((resolve) => {
        const result = `Result from child ${Math.random()}`;
        setTimeout(() => resolve(result), Math.random() * 500 + 100);
      });

    const unregister = registerPromise(doWork);
    return () => {
      // 清理函数
      unregister();
    };
  }, [registerPromise]);

  return <div>Child Component</div>;
};
