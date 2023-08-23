import React, { forwardRef, useImperativeHandle } from 'react';

interface RefComponentProps {
  style?: React.CSSProperties;
}

export interface RefComponentRef {
  afunction: () => void;
}

function InternalRefComponent(props: RefComponentProps, ref: React.ForwardedRef<RefComponentRef>) {
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
}

const RefComponent = forwardRef(InternalRefComponent);

export default RefComponent;
