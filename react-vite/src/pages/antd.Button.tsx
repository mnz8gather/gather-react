import { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { GeneralTab } from '@/shared/GeneralTab';

const items = [
  {
    key: 'icon',
    label: '只显示图标的按钮',
  },
];

export function AntdButtonPage() {
  const [current, setCurrent] = useState('icon');
  return (
    <GeneralTab title='antd Button' items={items} value={current} onChange={setCurrent}>
      {current === 'icon' ? <IconButton /> : null}
    </GeneralTab>
  );
}

function IconButton() {
  return (
    <>
      <Typography>
        <Typography.Paragraph>如果 icon 放在 Button 的 children 中，会有边距。</Typography.Paragraph>
      </Typography>
      <Space direction='vertical'>
        <Button icon={<DeleteOutlined />} type='text' />
        <Button type='text' danger>
          <DeleteOutlined />
        </Button>
      </Space>
    </>
  );
}
