import React, { forwardRef, useImperativeHandle } from 'react';

const InternalRefComponent: React.ForwardRefRenderFunction<RefComponentRef, RefComponentProps> = (props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        afunction() {
          console.log('afunction');
        },
      };
    },
    [],
  );

  return <div style={props?.style}>RefComponent</div>;
};

export interface RefComponentRef {
  afunction: () => void;
}

interface RefComponentProps {
  style?: React.CSSProperties;
}

// const RefComponent = forwardRef<RefComponentRef, RefComponentProps>(InternalRefComponent);
const RefComponent = forwardRef(InternalRefComponent);

export default RefComponent;
