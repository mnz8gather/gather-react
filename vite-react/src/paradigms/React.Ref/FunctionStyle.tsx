import React, { forwardRef, useImperativeHandle } from 'react';
import { ComponentRef } from '@/paradigms/React.Ref/interface';

interface FunctionRefProps extends React.HTMLProps<HTMLDivElement> {}

/** 普通函数形式 */
function InternalFunctionRef(props: FunctionRefProps, ref: React.ForwardedRef<ComponentRef>) {
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
}

const FunctionRef = forwardRef(InternalFunctionRef);

export default FunctionRef;
