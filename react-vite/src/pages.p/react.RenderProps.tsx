import { Button, Flex } from 'antd';
import { useCallback, useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
];

export function RenderPropsPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='React Render Props' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
    </GeneralTab>
  );
}

function Sample() {
  return (
    <RP
      renderProps={(onClick) => {
        return <Button onClick={onClick}>点击控制台打印</Button>;
      }}
    />
  );
}

interface RPProps {
  renderProps: (onClick: () => void) => React.ReactNode;
}

/**
 * 无法检查作为 child 传递的组件元素的类型
 * React.cloneElement 又不建议使用，使用 render props 代替
 *
 * [通过 props 传递数据](https://zh-hans.react.dev/reference/react/cloneElement#alternatives)
 * [Render Props](https://zh-hans.legacy.reactjs.org/docs/render-props.html)
 */
function RP(props: RPProps) {
  const { renderProps } = props;
  const handleClick = useCallback(() => {
    console.debug('click');
  }, []);
  return (
    <Flex gap='middle'>
      <Button>添加</Button>
      {renderProps?.(handleClick)}
      <Button>删除</Button>
    </Flex>
  );
}
