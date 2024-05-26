/**
 * interface 中方法单独的泛型
 *
 * 需要补充下，非箭头函数
 */
interface MechaProps {
  render: <P extends any[]>(...args: P) => React.ReactNode;
}

/** 函数声明 */
type FunctionSample = (a: number) => number;

/** 函数声明 */
interface FunctionSample2 {
  (a: number): number;
}

/** 函数声明 */
type FunctionSample3 = {
  (a: number): number;
};

/** 函数重载 */
interface FunctionOverload1 {
  (a: number): number;
  (a: string): string;
}

/** 函数重载 */
type FunctionOverload2 = {
  (a: number): number;
  (a: string): string;
};

/** 对象方法声明 */
