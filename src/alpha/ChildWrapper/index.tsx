import React from 'react';

interface ChildWrapperProps<P> {
  children: React.ReactElement<P>;
}

function ChildWrapper<P>(props: ChildWrapperProps<P>) {
  const { children } = props;

  const child = React.Children.only(children);

  if (child.type === React.Fragment) {
    return null;
  }

  if (React.isValidElement(child)) {
    const cloneProps = {
      ...child.props,
      onClick: () => {
        console.log('first');
      },
    };
    const clone = React.cloneElement(child, cloneProps);
    return clone;
  }

  return child;
}

export default ChildWrapper;
