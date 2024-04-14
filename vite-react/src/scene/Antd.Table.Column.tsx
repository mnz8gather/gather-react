import { useMemo } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface AntdTableColumnProps {
  access?: boolean;
}

/**
 * 处理 columns 的场景
 */
export default function AntdTableColumn(props: AntdTableColumnProps) {
  const { access } = props;
  const columns = useMemo(() => {
    const columnsInternal: TableColumnsType<DataType> = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];

    if (access) {
      columnsInternal.push({
        title: 'Action',
        dataIndex: 'action',
        width: 150,
        fixed: 'right',
        render(_, record) {
          return (
            <Button
              type='link'
              onClick={() => {
                console.log('record', record);
              }}
            >
              删除
            </Button>
          );
        },
      });
    }
    return columnsInternal;
  }, [access]);

  return <Table columns={columns} dataSource={data} />;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park',
  },
];
