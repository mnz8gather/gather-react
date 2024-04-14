/**
 * interface 中方法单独的泛型
 *
 * 需要补充下，非箭头函数
 */
interface MechaProps {
  render: <P extends any[]>(...args: P) => React.ReactNode;
}
