import { SetStateAction, useRef } from 'react';
import { useUpdate, useMemoizedFn } from 'ahooks';

type Options<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (v: T) => void;
};

/**
 * value === undefined 为 非受控组件
 * 有些场景：设置组件值为 undefined 进行清空值，在这里是不可以的
 *
 * 如果使用 useState useEffect 同步状态，会额外的多触发一次 Child 组件的重渲染
 * ref + forceUpdate 达到 useState 的效果
 */
export function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options;

  const update = useUpdate();

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue);
  if (value !== undefined) {
    // 同步 props.value 且不额外触发渲染
    stateRef.current = value;
  }

  /**
   * `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
   */
  const setState = useMemoizedFn((v: SetStateAction<T>, forceTrigger: boolean = false) => {
    const nextValue = typeof v === 'function' ? (v as Action)(stateRef.current) : v;
    // forceTrigger 为 false 的情况下，两次值相同，过滤掉这次的更新
    if (!forceTrigger && nextValue === stateRef.current) return;
    stateRef.current = nextValue;
    update();
    return onChange?.(nextValue);
  });
  return [stateRef.current, setState] as const;
}

type Action = <S>(prevState: S) => S;
