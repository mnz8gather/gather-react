import { Button } from 'antd';
import { useCallback } from 'react';
import { GeneralContainer } from '@/share/GeneralContainer';

interface RenderPropsProps {
  renderProps: (onClick: () => void) => React.ReactNode;
}

/**
 * 无法检查作为 child 传递的组件元素的类型
 * React.cloneElement 又不建议使用，使用 render props 代替
 *
 * [通过 props 传递数据](https://zh-hans.react.dev/reference/react/cloneElement#alternatives)
 * [Render Props](https://zh-hans.legacy.reactjs.org/docs/render-props.html)
 */
function RenderProps(props: RenderPropsProps) {
  const { renderProps } = props;
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  return (
    <ul>
      <li>1</li>
      {renderProps?.(handleClick)}
      <li>2</li>
    </ul>
  );
}

export function RenderPropsPage() {
  return (
    <GeneralContainer title='Render Props'>
      <RenderProps
        renderProps={(onClick) => {
          return <Button onClick={onClick}>点击打印</Button>;
        }}
      />
    </GeneralContainer>
  );
}
