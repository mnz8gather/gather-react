import React from 'react';
import { GeneralRef } from '@/paradigms/React.Ref/interface';

/**
 * 这里的 ref 是给类(ClassRef)的，不是给 div 的
 * React.HTMLProps<HTMLDivElement> 中也是有 ref 属性的
 * 所以 interface ClassRefProps extends React.HTMLProps<HTMLDivElement> {}
 * 这么书写会导致类型不对
 */
interface ClassRefProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {}

/**
 * 在类组件中，如果你需要在组件外部调用组件内部的方法，通常会使用 ref。
 * 这是因为 ref 提供了一种方式来访问组件的实例，从而允许你调用实例的方法。
 * 在函数式组件中，我们使用 useImperativeHandle 配合 forwardRef 来实现这一点，
 *
 * 而在类组件中，通常会直接将方法放在类的实例上，并通过 ref 来调用这些方法。(这里说明类组件的情况)
 *
 * 总之，类组件完全可以使用 ref 来实现类似 useImperativeHandle 的功能，允许外部调用组件内的方法。
 * 这是处理类组件中某些特定交互的一种有效方式。
 */
export class ClassRef extends React.Component<ClassRefProps, {}> {
  log = (s?: string) => {
    console.log(s);
  };

  render() {
    return <div {...this.props} />;
  }
}

/**
 * 类组件 使用 React.forwardRef 传递 ref
 *
 * 产生的原因是：使用 ref 函数组件(FunctionRef)转换成类组件
 * vite-react\src\paradigms\React.Ref\FunctionStyle.tsx
 *
 * gpt: 这种方式确保了类似的功能实现，即使在转换为类组件的过程中，组件外部对方法的访问方式保持不变。
 * gpt 说的 保持不变 这里能想到的是：useRef 的泛型还是函数组件使用的泛型(GeneralRef)。
 *
 * 这里展示：即使是在类组件中，你也可以用 React.forwardRef 来传递 ref，并将其绑定到组件实例上。
 *
 * 实际情况是能不用就不用
 */
export const ClassRefWithForward = React.forwardRef<GeneralRef, ClassRefProps>((props, ref) => {
  return (
    <ClassRef
      {...props}
      ref={(instance) => {
        // Attach the methods to the ref
        if (ref && instance) {
          if (typeof ref === 'function') {
            ref({
              log: instance.log,
            });
          } else {
            ref.current = {
              log: instance.log,
            };
          }
        }
      }}
    />
  );
});
