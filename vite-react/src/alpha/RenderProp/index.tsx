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
