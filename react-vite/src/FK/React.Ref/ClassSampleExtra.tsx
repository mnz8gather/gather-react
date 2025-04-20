import React from 'react';
import { ClassRef } from './ClassSample';
import type { GeneralRef } from '@/FK/React.Ref/interface';
import type { ClassRefProps } from './ClassSample';

/**
 * 类组件 使用 React.forwardRef 传递 ref
 *
 * 这个文件产生的原因是：
 * 想要把使用 ref 的函数组件(FunctionRef)转换成类组件
 * react-vite\src\paradigms\React.Ref\FunctionStyle.tsx
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
