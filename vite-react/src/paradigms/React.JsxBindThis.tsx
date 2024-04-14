import { useCallback, useMemo } from 'react';
import { Table, Button } from 'antd';

export default () => {
  const columns = [
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: unknown, record: any) => {
        return (
          <>
            <Button type='link' onClick={handle1(record)}>
              处理1
            </Button>
            <Button type='link' onClick={handle2(record)}>
              处理2
            </Button>
            <Button type='link' onClick={handle3(record)}>
              处理3
            </Button>
          </>
        );
      },
    },
  ];

  const handle1 = useCallback((record: any) => {
    return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.log('record', record);
      console.log('event', event);
    };
  }, []);

  const handle2 = useCallback(
    (record: any) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.log(event);
      console.log(record);
    },
    [],
  );

  const handle3 = useMemo(
    () => (record: any) => () => {
      console.log(record);
    },
    [],
  );

  return (
    <>
      <Table columns={columns} dataSource={[{ id: '1' }]} rowKey='id' />
    </>
  );
};
