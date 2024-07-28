import { useAntdTable } from 'ahooks';
import { Form, Select, Table, Pagination } from 'antd';
import { paradigm_user } from '@/services/paradigm';
import type { TableColumnsType } from 'antd';
import type { ParadigmUserParams, ParadigmUserItem } from '@/services/paradigm';
import type { Params } from 'ahooks/es/useAntdTable/types';

const getTableData = ({ current, pageSize }: Params[0], formData: Omit<ParadigmUserParams, 'page' | 'size'>) => {
  return paradigm_user({ ...formData, page: current, size: pageSize }).then((res) => {
    return {
      list: res?.result || [],
      total: res?.total || 0,
    };
  });
};

export function UseAntdTableCustomPagination() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, { form });
  const { submit } = search;
  const { pagination, onChange, ...restTableProps } = tableProps;

  return (
    <>
      <Form form={form}>
        <Form.Item name='gender' initialValue='male'>
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Select.Option value=''>all</Select.Option>
            <Select.Option value='male'>male</Select.Option>
            <Select.Option value='female'>female</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Table columns={columns} rowKey='email' pagination={false} {...restTableProps} />
      {pagination?.total ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '16px 0',
            paddingRight: '20px',
          }}
        >
          <>{`Total ${pagination.total} items`}</>
          <Pagination
            {...pagination}
            simple
            onChange={(page: number, pageSize: number) => {
              onChange?.({ current: page, pageSize });
            }}
          />
        </div>
      ) : null}
    </>
  );
}

const columns: TableColumnsType<ParadigmUserItem> = [
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'email',
    dataIndex: 'email',
  },
  {
    title: 'phone',
    dataIndex: 'phone',
  },
  {
    title: 'gender',
    dataIndex: 'gender',
  },
  {
    title: 'country',
    dataIndex: 'country',
  },
];
