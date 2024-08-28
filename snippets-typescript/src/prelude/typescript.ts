// #region ==================================== 函数声明 ====================================
/** type-inference 类型推断 */
function functionTypeInference(a: number): number {
  return a;
}

type FunctionSample = (a: number) => number;

interface FunctionSample2 {
  (a: number): number;
}

type FunctionSample3 = {
  (a: number): number;
};
// #endregion ==============================================================================

// #region ==================================== 函数重载 ====================================
interface FunctionOverload1 {
  (a: number): number;
  (a: string): string;
}

type FunctionOverload2 = {
  (a: number): number;
  (a: string): string;
};
// #endregion ==============================================================================

/**
 * interface 中方法单独的泛型
 *
 * 需要补充下，非箭头函数
 */
interface MechaProps {
  render: <P extends any[]>(...args: P) => React.ReactNode;
}

// #region ==================================== 对象方法声明 ====================================
/** 1. type-inference */
const objectMethod = {
  /** 示例方法 */
  method(a: string) {
    return a;
  },
};

class ClassMethod {
  method(a: string) {
    return a;
  }
}

interface ClassImplementMethod {
  method(a: string): string;
}
/** 2. 在类中声明和实现方法 */
class ClassMethod2 implements ClassImplementMethod {
  method(a: string) {
    return a;
  }
}

/** 3. 函数类型 */
interface MethodObject {
  method(a: string): string;
}

const methodObject: MethodObject = {
  method(a) {
    return a;
  },
};
// #endregion ==============================================================================
