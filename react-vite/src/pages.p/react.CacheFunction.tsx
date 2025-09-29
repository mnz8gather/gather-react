import { useCallback, useMemo } from 'react';
import { Table, Button, Switch } from 'antd';
import { GeneralContainer } from '@/shared/GeneralContainer';
import type { TableColumnsType } from 'antd';

function CacheFunction() {
  const columns: TableColumnsType<DataItemType> = [
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: unknown, record: DataItemType) => {
        return (
          <>
            <Switch onChange={handleSwitch} />
            <Button type='link' onClick={handle1(record)}>
              处理1
            </Button>
            <Button type='link' onClick={handle2(record)}>
              处理2
            </Button>
          </>
        );
      },
    },
  ];

  // useCallback 缓存一个函数
  const handleSwitch = useCallback((checked: boolean) => {
    console.debug('handleSwitch checked', checked);
  }, []);

  // useCallback 缓存一个函数，函数返回一个函数
  const handle1 = useCallback(
    (record: DataItemType) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.debug('handle1 record', record);
      console.debug('handle1 event', event);
    },
    [],
  );

  // useMemo 函数中，缓存一个函数，函数返回一个函数
  const handle2 = useMemo(
    () => (record: DataItemType) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.debug('handle2 record', record);
      console.debug('handle2 event', event);
    },
    [],
  );

  return <Table columns={columns} dataSource={[{ id: '1' }]} rowKey='id' />;
}

interface DataItemType {
  id: string;
}

export function CacheFunctionPage() {
  return (
    <GeneralContainer>
      <CacheFunction />
    </GeneralContainer>
  );
}
