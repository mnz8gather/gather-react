import React from 'react';
import { GeneralRef } from '@/FK/React.Ref/interface';

interface ClassRefProps {
  style?: React.CSSProperties;
}

// ClassRef 的第一版
// 保留的原因是处理 props 类型时，没有 Omit React.HTMLProps<HTMLDivElement> 中的 ref
// 直接使用 interface ClassRefProps extends React.HTMLProps<HTMLDivElement> {}
// 导致类型错误

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
  log = () => {
    console.log('ClassStyle');
  };

  render() {
    return <div style={this.props.style}>ClassRef</div>;
  }
}

/**
 * 类组件 使用 React.forwardRef 传递 ref
 *
 * 产生的原因是：使用 ref 函数组件(FunctionRef)转换成类组件
 * react-vite\src\paradigms\React.Ref\FunctionStyle.tsx
 *
 * gpt: 这种方式确保了类似的功能实现，即使在转换为类组件的过程中，组件外部对方法的访问方式保持不变。
 * gpt 说的 保持不变 这里能想到的是：useRef 的泛型还是函数组件使用的泛型(GeneralRef)。
 *
 * 这里展示：即使是在类组件中，你也可以用 React.forwardRef 来传递 ref，并将其绑定到组件实例上。
 *
 * 实际情况是能不用就不用
 */
export const ClassWithForwardRef = React.forwardRef<GeneralRef, ClassRefProps>((props, ref) => {
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
