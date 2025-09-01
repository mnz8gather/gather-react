import { useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';
import { Col, Row, Switch } from 'antd';

const items = [
  {
    key: 'mock-form-item',
    label: '模拟 FormItem',
  },
];

export function AntdRowPage() {
  const [current, setCurrent] = useState('mock-form-item');
  return (
    <GeneralTab title='antd Form' items={items} value={current} onChange={setCurrent}>
      {current === 'mock-form-item' ? <MockFormItem /> : null}
    </GeneralTab>
  );
}

function MockFormItem() {
  return (
    <>
      <Row>
        <Col flex='300px'>
          <label style={itemLabelStyle} htmlFor='sb'>
            LABEL FOR SB
          </label>
        </Col>
        <Col flex='1' style={{ minWidth: 0, height: '32px' }}>
          <div style={itemInputStyle}>
            <Switch id='sb' />
          </div>
        </Col>
      </Row>
    </>
  );
}

const itemLabelStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  maxWidth: '100%',
  height: '32px',
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: '14px',
};

const itemInputStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '32px',
};
