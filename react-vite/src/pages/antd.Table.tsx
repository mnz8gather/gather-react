import { useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
];

// columns-dynamic
export function AntdTablePage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='antd Table' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
    </GeneralTab>
  );
}

function Sample() {
  return <></>;
}
