import dayjs from 'dayjs';
import { useAntdTable } from 'ahooks';
import { DeleteOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import { App, Button, DatePicker, Flex, Form, Pagination, Select, Space, Table, Tooltip, Typography } from 'antd';
import { GeneralTab } from '@/shared/GeneralTab';
import { deletePeople, deletePerson, getAllPeople } from '@/services/user';
import type { DatePickerProps, TableColumnsType } from 'antd';
import type { TableRowSelection } from '@/tool/antdType';
import type { Params } from 'ahooks/es/useAntdTable/types';
import type { User, UserListFilter } from '@/services/user';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
  {
    key: 'initial-params',
    label: '初始化参数',
  },
  {
    key: 'extra-params',
    label: '额外参数',
  },
  {
    key: 'reload-page-1',
    label: '重新加载第 1 页',
  },
  {
    key: 'custom-pagination',
    label: '不用 Table 内置的 Pagination',
  },
];

export function UseAntdTablePage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='useAntdTable' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
      {current === 'initial-params' ? <InitialParams /> : null}
      {current === 'extra-params' ? <ExtraParams /> : null}
      {current === 'reload-page-1' ? <ReloadPage1 /> : null}
      {current === 'custom-pagination' ? <CustomPagination /> : null}
    </GeneralTab>
  );
}

const options = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];

const columns: TableColumnsType<User> = [
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'sex',
    dataIndex: 'sex',
  },
  {
    title: 'jobType',
    dataIndex: 'jobType',
  },
  {
    title: 'jobTitle',
    dataIndex: 'jobTitle',
  },
];

const getTableData = (params: Params[0], formData?: Pick<UserListFilter, 'sex'>) => {
  const { current, pageSize } = params;
  return getAllPeople({ ...formData, current, pageSize }).then((res) => {
    return {
      list: res?.data || [],
      total: res?.total || 0,
    };
  });
};

function Sample() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, { form });
  const { submit } = search;
  const { pagination, ...excludePaginationTableProps } = tableProps;
  return (
    <>
      <Form form={form}>
        <Form.Item name='sex' label='sex'>
          <Select options={options} onChange={submit} allowClear placeholder='sex' style={{ width: 120 }} />
        </Form.Item>
      </Form>
      <Table
        {...excludePaginationTableProps}
        pagination={{ ...pagination, showSizeChanger: true, hideOnSinglePage: false, showTotal: (total) => total }}
        rowKey='id'
        columns={columns}
      />
    </>
  );
}

function InitialParams() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, { form, defaultParams: [{ current: 2, pageSize: 8 }, { sex: 'female' }] });
  const { submit } = search;
  const { pagination, ...excludePaginationTableProps } = tableProps;
  return (
    <>
      <Typography>
        <Typography.Paragraph>设置初始化数据，分页和表单都可以设置</Typography.Paragraph>
        <Typography.Paragraph>
          <blockquote>
            useAntdTable 通过 defaultParams 设置初始化值，defaultParams
            是一个数组，第一项为分页相关参数，第二项为表单相关数据。如果有第二个值，我们会帮您初始化表单！
          </blockquote>
          <blockquote>需要注意的是，初始化的表单数据可以填写 simple 和 advance 全量的表单数据，我们会帮您挑选当前激活的类型中的表单数据。</blockquote>
        </Typography.Paragraph>
        <Typography.Paragraph>initialValue 也可以设置默认参数，defaultParams 和 initialValue 都设置时，以 defaultParams 为最终结果。</Typography.Paragraph>
      </Typography>
      <Form form={form}>
        <Form.Item name='sex' initialValue='male' label='sex'>
          <Select options={options} onChange={submit} allowClear placeholder='sex' style={{ width: 120 }} />
        </Form.Item>
      </Form>
      <Table
        {...excludePaginationTableProps}
        pagination={{ ...pagination, showSizeChanger: true, hideOnSinglePage: false, showTotal: (total) => total }}
        rowKey='id'
        columns={columns}
      />
    </>
  );
}

interface ExtraParamsType {
  begin?: number;
}

const getTableDataExtra = (extraParams: ExtraParamsType) => (params: Params[0], formData?: Pick<UserListFilter, 'sex'>) => {
  const { current, pageSize } = params;
  return getAllPeople({ ...extraParams, ...formData, current, pageSize }).then((res) => {
    return {
      list: res?.data || [],
      total: res?.total || 0,
    };
  });
};

function ExtraParams() {
  const [begin, setBegin] = useState<number>();
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableDataExtra({ begin }), { form, refreshDeps: [begin] });
  const { submit } = search;
  const { pagination, ...excludePaginationTableProps } = tableProps;
  const beginChange: DatePickerProps['onChange'] = (date) => {
    setBegin(date.valueOf());
  };
  return (
    <>
      <Typography>
        <Typography.Paragraph>增加不在表单中的额外参数</Typography.Paragraph>
        <Typography.Paragraph>
          getTableData 的第一个参数(Params[0])中有 extra, filters, sorter 等，所以不要把接口的额外信息放在这里。在分页跳转的时候可以看到 extra 。
        </Typography.Paragraph>
      </Typography>
      <Flex vertical gap='middle'>
        <Space>
          begin
          <DatePicker value={typeof begin === 'number' ? dayjs(begin) : begin} onChange={beginChange} />
        </Space>
        <Form form={form}>
          <Form.Item name='sex' label='sex'>
            <Select options={options} onChange={submit} allowClear placeholder='sex' style={{ width: 120 }} />
          </Form.Item>
        </Form>
      </Flex>
      <Table
        {...excludePaginationTableProps}
        pagination={{ ...pagination, showSizeChanger: true, hideOnSinglePage: false, showTotal: (total) => total }}
        rowKey='id'
        columns={columns}
      />
    </>
  );
}

function ReloadPage1() {
  const { message } = App.useApp();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const { tableProps, search, pagination: paginationOfResult, refresh: reloadWithCurrentPage } = useAntdTable(getTableData, { form });
  const { submit } = search;
  const { pagination, ...excludePaginationTableProps } = tableProps;
  const reloadWithPage1 = useCallback(() => {
    paginationOfResult?.changeCurrent(1);
  }, [paginationOfResult]);
  const onDelete = useCallback<React.MouseEventHandler<HTMLSpanElement>>(
    (e) => {
      const dataset = e.currentTarget.dataset;
      const id = dataset?.id;
      if (id) {
        deletePerson(id).then(() => {
          message.success('success');
          setSelectedRowKeys((prev) => prev?.filter((item) => item !== id));
          reloadWithPage1();
        });
      }
    },
    [reloadWithPage1],
  );
  const reloadColumns = useMemo(() => {
    const temp: TableColumnsType<User> = [
      ...columns,
      {
        title: 'Operation',
        dataIndex: '_operation',
        width: 200,
        render: (_, record) => {
          return (
            <>
              <DeleteOutlined data-id={record?.id} onClick={onDelete} />
            </>
          );
        },
      },
    ];
    return temp;
  }, []);
  const rowSelectionChange = useCallback<TableRowSelection<User>['onChange']>((selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }, []);
  const batchDelete = useCallback(() => {
    deletePeople({ ids: selectedRowKeys as string[] }).then(() => {
      message.success('success');
      setSelectedRowKeys([]);
      reloadWithPage1();
    });
  }, [selectedRowKeys, reloadWithPage1]);
  const batchDisabled = selectedRowKeys?.length <= 0;

  return (
    <>
      <Flex gap='large' vertical style={{ marginBottom: '24px' }}>
        <Flex gap='large'>
          <Button onClick={reloadWithCurrentPage}>在当前页刷新</Button>
          <Button onClick={reloadWithPage1}>在第一页刷新</Button>
        </Flex>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Form form={form} layout='inline'>
            <Form.Item name='sex' label='sex'>
              <Select options={options} onChange={submit} allowClear placeholder='sex' style={{ width: 120 }} />
            </Form.Item>
          </Form>
          <Space style={{ marginLeft: 'auto' }}>
            <Tooltip title={batchDisabled ? '请先勾选' : undefined}>
              <Button disabled={batchDisabled} onClick={batchDelete}>
                批量删除
              </Button>
            </Tooltip>
          </Space>
        </div>
      </Flex>
      <Table
        {...excludePaginationTableProps}
        pagination={{ ...pagination, showSizeChanger: true, hideOnSinglePage: false, showTotal: (total) => total }}
        rowKey='id'
        columns={reloadColumns}
        rowSelection={{
          preserveSelectedRowKeys: true,
          selectedRowKeys,
          onChange: rowSelectionChange,
        }}
      />
    </>
  );
}

function CustomPagination() {
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, { form });
  const { submit } = search;
  const { pagination, onChange, ...restTableProps } = tableProps;
  return (
    <>
      <Typography>
        <Typography.Paragraph>自定义分页，不用 Table 内置的 Pagination</Typography.Paragraph>
        <Typography.Paragraph></Typography.Paragraph>
        <Typography.Paragraph>
          使用 useAntdTable 遇到以下提示的处理方法。
          <Typography.Text code>
            Warning: [antd: Table] `dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config
            correct data with async mode.
          </Typography.Text>
          <ul>
            <li>
              <Typography.Link href='https://github.com/alibaba/hooks/issues/1938' target='_blank'>
                相关 issue
              </Typography.Link>
            </li>
            <li>
              <Typography.Link href='https://github.com/ant-design/pro-components/issues/3436#issuecomment-1815862446' target='_blank'>
                相关 issue
              </Typography.Link>
            </li>
            <li>
              <Typography.Link href='https://github.com/ant-design/ant-design/issues/14557' target='_blank'>
                相关 issue
              </Typography.Link>
            </li>
          </ul>
        </Typography.Paragraph>
      </Typography>
      <Form form={form}>
        <Form.Item name='sex' label='sex'>
          <Select options={options} onChange={submit} allowClear placeholder='sex' style={{ width: 120 }} />
        </Form.Item>
      </Form>
      <Table {...restTableProps} pagination={false} rowKey='id' columns={columns} />
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
