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
  /** readOnly 和 disabled 是不同的表现 */
  readOnly?: boolean;
}

/**
 * 有 value, 就使用 value, 不用管 state, state 也是一直不变的
 *
 * 没有 value 的时候，使用内部的 state, value 会一直是 undefined
 *
 * 改变组件值的时候，也要这么考虑
 */
export default function AntdFormControlTable(props: AntdFormControlTableProps) {
  const { value, onChange, readOnly } = props;

  const triggerChange = useCallback(
    (changedValue: DataType[]) => {
      onChange?.(changedValue);
    },
    [onChange],
  );

  const [dataSource, setDataSource] = useSafeState<DataType[]>([]);

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
      let newData: DataType[];
      // 将相同的处理，提成函数
      function produce(source: DataType[]): DataType[] {
        return source.concat([values]);
      }
      if (value === undefined) {
        // 这里是不在 form 中，没有 value 的情况
        newData = produce(dataSource);
        setDataSource(newData);
      } else {
        // 这里是在 form 中的情况
        newData = produce(value);
      }
      triggerChange(newData);
    },
    [value, triggerChange, dataSource, setDataSource],
  );

  // useEffect(() => {
  //   console.log('value', value);
  // }, [value]);

  // useEffect(() => {
  //   console.log('dataSource', dataSource);
  // }, [dataSource]);

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
