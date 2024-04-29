import React, { forwardRef, useImperativeHandle } from 'react';
import { ComponentRef } from '@/paradigms/React.Ref/interface';

type ArrowFunctionRefProps = React.HTMLProps<HTMLDivElement>;

/** 箭头函数形式 两种 typescript 书写方式 */
const InternalArrowFunctionRefTS1: React.ForwardRefRenderFunction<ComponentRef, ArrowFunctionRefProps> = (props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        log(s?: string) {
          console.log(s);
        },
      };
    },
    [],
  );

  return <div {...props} />;
};

const ArrowFunctionRefTS1 = forwardRef(InternalArrowFunctionRefTS1);

/** 箭头函数形式 两种 typescript 书写方式 */
const InternalArrowFunctionRefTS2 = (props: ArrowFunctionRefProps, ref: React.ForwardedRef<ComponentRef>) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        log(s?: string) {
          console.log(s);
        },
      };
    },
    [],
  );

  return <div {...props} />;
};

const ArrowFunctionRefTS2 = forwardRef<ComponentRef, ArrowFunctionRefProps>(InternalArrowFunctionRefTS2);

export { ArrowFunctionRefTS1, ArrowFunctionRefTS2 };
