import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState } from 'react';
import { Button, Popconfirm, Space, Switch, Table } from 'antd';
import { GeneralTab } from '@/shared/GeneralTab';
import type { ButtonProps, SwitchProps, TableColumnsType } from 'antd';

const items = [
  {
    key: 'sample',
    label: 'dataset 使用示例',
  },
];

export function DatasetPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='useControllableValue' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
    </GeneralTab>
  );
}

const dataSource: any[] = [
  {
    id: uuidv4(),
  },
];

function Sample() {
  const buttonClick = useCallback<Required<ButtonProps>['onClick']>((event) => {
    const dataset = event?.currentTarget?.dataset;
    alert('Button: ' + dataset?.id);
  }, []);
  const switchChange = useCallback<Required<SwitchProps>['onChange']>((_checked, event) => {
    const currentTarget = event.currentTarget;
    if (currentTarget instanceof HTMLElement) {
      const dataset = currentTarget?.dataset;
      alert('Switch: ' + dataset?.id);
    }
  }, []);
  const confirm = useCallback((e?: React.MouseEvent<HTMLElement>) => {
    const dataset = e?.currentTarget?.dataset;
    alert('Popconfirm: ' + dataset?.id);
  }, []);

  const columns: TableColumnsType = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      // FK: Input Icon 原生标签
      render(_, record) {
        return (
          <Space>
            <Button data-id={record?.id} onClick={buttonClick}>
              Button
            </Button>
            <Switch data-id={record?.id} onChange={switchChange} />
            <Popconfirm
              title='Delete the task'
              onConfirm={confirm}
              okButtonProps={{
                'data-id': record?.id,
              }}
            >
              <Button>Popconfirm</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}
