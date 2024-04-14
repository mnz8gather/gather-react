import { useMemo } from 'react';
import { useAntdTable } from 'ahooks';
import { Form, Select, Table } from 'antd';
import { paradigm_user } from '@/services/paradigm';
import type { TableColumnsType } from 'antd';
import type { ParadigmUserParams, ParadigmUserItem } from '@/services/paradigm';
import type { Params } from 'ahooks/es/useAntdTable/types';

/** useAntdTable 默认情况 */
const getTableData = ({ current, pageSize }: Params[0], formData: Omit<ParadigmUserParams, 'page' | 'size'>) => {
  return paradigm_user({ ...formData, page: current, size: pageSize }).then((res) => {
    return {
      list: res?.result || [],
      total: res?.total || 0,
    };
  });
};

export default function UseAntdTableSample() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultParams: [{ current: 1, pageSize: 20 }, {}],
  });

  const { submit } = search;

  const columns = useMemo(() => {
    const columnsInternal: TableColumnsType<ParadigmUserItem> = [
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
    ];

    return columnsInternal;
  }, []);

  return (
    <>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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

/** 增加不在 form 的请求参数 */
const getTableDataExtra = (extraParams: Record<string, string>) => (_: unknown, formData: ParadigmUserParams) => {
  return paradigm_user({ ...extraParams, ...formData }).then((res) => {
    return {
      list: res?.result || [],
      total: res?.total || 0,
    };
  });
};

export function Extra(id: string) {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableDataExtra({ id }), {
    form,
    refreshDeps: [id],
  });

  const { submit } = search;

  const columns = useMemo(() => {
    const columnsInternal: TableColumnsType<ParadigmUserItem> = [
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
    ];

    return columnsInternal;
  }, []);

  return (
    <>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
 * 初始化数据
 * useAntdTable 通过 defaultParams 设置初始化值，defaultParams 是一个数组，第一项为分页相关参数，第二项为表单相关数据。如果有第二个值，我们会帮您初始化表单！
 * 需要注意的是，初始化的表单数据可以填写 simple 和 advance 全量的表单数据，我们会帮您挑选当前激活的类型中的表单数据。
 */
