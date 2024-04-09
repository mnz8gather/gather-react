```tsx
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
```

```tsx
import { useCallback } from 'react';

interface RenderPropProps {
  renderProp: (onClick: () => void) => React.ReactNode;
}

/**
 * 无法检查作为 child 传递的组件元素的类型
 * React.cloneElement 又不建议使用，使用 render prop 代替
 */

function RenderProp(props: RenderPropProps) {
  const { renderProp } = props;

  const handleClick = useCallback(() => {
    console.log('handleClick');
  }, []);

  return <>{renderProp?.(handleClick)}</>;
}

export default RenderProp;
```

[通过 props 传递数据](https://zh-hans.react.dev/reference/react/cloneElement#alternatives)
