import { useCallback, useMemo } from 'react';
import { Table, Button, Switch } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  id: string;
}

export default function CacheFunction() {
  const columns: TableColumnsType<DataType> = [
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: unknown, record: DataType) => {
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
    console.log('handleSwitch checked', checked);
  }, []);

  // useCallback 缓存一个函数，函数返回一个函数
  const handle1 = useCallback(
    (record: DataType) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.log('handle1 record', record);
      console.log('handle1 event', event);
    },
    [],
  );

  // useMemo 缓存一个函数1，函数1返回一个函数2，函数2返回一个函数3
  const handle2 = useMemo(
    () => (record: DataType) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.log('handle2 record', record);
      console.log('handle2 event', event);
    },
    [],
  );

  return (
    <>
      <Table columns={columns} dataSource={[{ id: '1' }]} rowKey='id' />
    </>
  );
}
