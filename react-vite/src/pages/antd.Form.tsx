import { useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
];

// FormListRenderTable
// CustomizedComponent
// item-dependencies
// ItemMultiElement
// modal 和 form 的完整示例 -offen
export function AntdFormPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='antd Form' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
    </GeneralTab>
  );
}

function Sample() {
  return <></>;
}
