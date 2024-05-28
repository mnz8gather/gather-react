/**
 * 类组件 使用 ref 并将 props 传递给 div 的情况
 *
 * Omit ref 避免类型冲突
 *
 * ref 会给类组件
 *
 * divRef 可以传递给相应的 div
 */
interface ClassRefProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  divRef?: React.Ref<HTMLDivElement>;
}
