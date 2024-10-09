import { useEventEmitter } from 'ahooks';

// 有泛型的 typeof
type A<T> = typeof useEventEmitter<T>;
// 获取 EventEmitter
type B<T> = ReturnType<A<T>>;
