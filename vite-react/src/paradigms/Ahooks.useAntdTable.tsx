import { useAntdTable } from 'ahooks';
import { Form, Select, Table } from 'antd';
import { paradigm_user } from '@/services/paradigm';
import type { TableColumnsType } from 'antd';
import type { ParadigmUserParams, ParadigmUserItem } from '@/services/paradigm';
import type { Params } from 'ahooks/es/useAntdTable/types';

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

const getTableData = ({ current, pageSize }: Params[0], formData: Omit<ParadigmUserParams, 'page' | 'size'>) => {
  return paradigm_user({ ...formData, page: current, size: pageSize }).then((res) => {
    return {
      list: res?.result || [],
      total: res?.total || 0,
    };
  });
};

/**
 * useAntdTable 默认情况
 *
 * initialValue 也可以设置默认参数
 */
export default function UseAntdTableSample() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, { form });
  const { submit } = search;

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
      <Table columns={columns} rowKey='email' {...tableProps} />
    </>
  );
}

/**
 * 设置初始化数据，分页和表单都可以设置
 *
 * useAntdTable 通过 defaultParams 设置初始化值，defaultParams 是一个数组，
 * 第一项为分页相关参数，第二项为表单相关数据。如果有第二个值，我们会帮您初始化表单！
 *
 * 需要注意的是，初始化的表单数据可以填写 simple 和 advance 全量的表单数据，我们会帮您挑选当前激活的类型中的表单数据。
 */
export function DefaultParams() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultParams: [{ current: 1, pageSize: 5 }, { gender: 'female' }],
  });

  const { submit } = search;

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
      <Table columns={columns} rowKey='email' {...tableProps} />
    </>
  );
}

const getTableDataExtra = (extraParams: Record<string, string>) => (pagination: Params[0], formData: Omit<ParadigmUserParams, 'page' | 'size'>) => {
  const { current, pageSize } = pagination;
  return paradigm_user({ page: current, size: pageSize, ...formData, ...extraParams }).then((res) => {
    return {
      list: res?.result || [],
      total: res?.total || 0,
    };
  });
};

/** 增加不在表单中的额外参数 */
export function Extra({ country }: { country: string }) {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableDataExtra({ country }), {
    form,
    refreshDeps: [country],
  });

  const { submit } = search;

  return (
    <>
      <Form form={form}>
        <Form.Item name='gender'>
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Select.Option value=''>all</Select.Option>
            <Select.Option value='male'>male</Select.Option>
            <Select.Option value='female'>female</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Table columns={columns} rowKey='email' {...tableProps} />
    </>
  );
}
