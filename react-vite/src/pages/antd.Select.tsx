import { useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
];

export function AntdSelectPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='antd Select' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
    </GeneralTab>
  );
}

// delete
function Sample() {
  return <></>;
}
