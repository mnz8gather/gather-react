import FunctionRef from '@/paradigms/React.Ref/FunctionStyle';
import { ArrowFunctionRefTS1, ArrowFunctionRefTS2 } from '@/paradigms/React.Ref/ArrowFunctionStyle';
import { ClassRef, ClassWithForwardRef } from '@/paradigms/React.Ref/ClassStyle';

export { FunctionRef, ArrowFunctionRefTS1, ArrowFunctionRefTS2, ClassRef, ClassWithForwardRef };

export type { ComponentRef } from '@/paradigms/React.Ref/interface';

/**
 * props ref 关键字
 * 这个 react 会特殊处理，所以在处理 ref 时，要使用 forwardRef
 * ref 特殊处理的原因：
 * 使用 forwardRef 的原因：
 *
 * 通过其他名字传递 ref 不需要使用 forwardRef 例如 innerRef tableRef
 *
 * Ref 的作用
 * 1. 引用 共 useImperativeHandle 使用 不绑定到 HTML element 元素上
 * 2. 绑定到 HTML element 元素
 *
 *
 * 传递：
 * C -> C
 * F -> F
 * C -> F
 * F -> C
 *
 * C -> F -> C
 *            ref forwardRef
 *            otherRef
 * F -> C -> F
 *
 *
 * 多个 ref 需要传递的情况：
 *      函数式：通过 useImperativeHandle 集成在一起
 *      类组件：
 */

// [HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
