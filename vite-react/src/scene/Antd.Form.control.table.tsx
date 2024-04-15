import { useCallback, useMemo } from 'react';
import { useSafeState } from 'ahooks';
import { Button, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  name?: string;
}

interface AntdFormControlTableProps {
  value?: DataType[];
  onChange?: (value: DataType[]) => void;
  /** readOnly 和 disabled 是不同的 */
  readOnly?: boolean;
}

export default function AntdFormControlTable(props: AntdFormControlTableProps) {
  const { value, onChange, readOnly } = props;

  const triggerChange = useCallback(
    (changedValue: DataType[]) => {
      onChange?.(changedValue);
    },
    [onChange, value],
  );

  const [dataSource, setDataSource] = useSafeState<DataType[]>(value || []);

  const columns = useMemo(() => {
    const columnsInternal: TableColumnsType<DataType> = [
      {
        title: 'name',
        dataIndex: 'name',
      },
    ];

    if (!readOnly) {
      columnsInternal.push({
        title: '操作',
        dataIndex: 'operation',
        width: 150,
        fixed: 'right',
        render(_: unknown, record, index) {
          return (
            <Space>
              <Button type='link' style={{ padding: 0 }}>
                编辑
              </Button>
              <Button type='link' style={{ padding: 0 }}>
                复制
              </Button>
              <Button type='link' style={{ padding: 0 }}>
                删除
              </Button>
            </Space>
          );
        },
      });
    }
    return columnsInternal;
  }, [readOnly, value]);

  const handleAdd = useCallback(
    (values: DataType) => {
      setDataSource((prev) => {
        const newData = prev?.concat([values]);
        triggerChange(newData);
        return newData;
      });
    },
    [setDataSource, triggerChange],
  );

  return (
    <>
      {readOnly ? null : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '16px',
          }}
        >
          <Button
            type='primary'
            onClick={() => {
              handleAdd({ name: '1' });
            }}
          >
            添加
          </Button>
        </div>
      )}
      <Table columns={columns} rowKey='name' dataSource={value || dataSource} />
    </>
  );
}
