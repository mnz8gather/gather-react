import { useState } from 'react';
import { useRequest } from 'ahooks';
import { Select, Table, Typography } from 'antd';
import { getAllPeople } from '@/services/user';
import { GeneralTab } from '@/shared/GeneralTab';
import type { TableColumnsType } from 'antd';
import type { User } from '@/services/user';

const items = [
  {
    key: 'paging',
    label: '分页',
  },
  {
    key: 'refresy-deps',
    label: '依赖刷新',
  },
  {
    key: 'processing-data',
    label: '处理数据',
  },
  {
    key: 'modal',
    label: 'Modal',
    desc: 'FK: Modal 打开时请求，支持分页请求，关闭窗口后分页参数恢复默认',
  },
];

export function UseRequestPage() {
  const [current, setCurrent] = useState('paging');
  return (
    <GeneralTab title='useRequest' items={items} value={current} onChange={setCurrent}>
      {current === 'paging' ? <Paging /> : null}
      {current === 'refresy-deps' ? <Paging /> : null}
      {current === 'processing-data' ? <ProcessingData /> : null}
    </GeneralTab>
  );
}

/** 分页 */
function Paging() {
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 10 });
  const [sex, setSex] = useState();
  const { data, loading } = useRequest(() => getAllPeople({ ...pageInfo, sex }), { refreshDeps: [pageInfo, sex] });
  return (
    <>
      <Typography>
        <Typography.Paragraph>useRequest(ahooks v3) 第一个参数是返回 Promise 的函数。</Typography.Paragraph>
        <Typography.Paragraph>
          <blockquote>defaultParams 首次默认执行时，传递给 service 的参数。</blockquote>
        </Typography.Paragraph>
        <Typography.Title level={5}>额外参数</Typography.Title>
        <Typography.Paragraph>useRequest 不涉及额外参数，额外参数一般是 useAntdTable 需要，因为它要求了 service 的参数。</Typography.Paragraph>
      </Typography>
      <Select onChange={setSex} value={sex} options={options} allowClear placeholder='sex' style={{ width: 120 }} />
      <Table
        rowKey='id'
        loading={loading}
        columns={columns}
        dataSource={data?.data}
        pagination={{
          onChange: (page, pageSize) => {
            setPageInfo({ current: page, pageSize });
          },
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
          total: data?.total ?? 0,
          showSizeChanger: true,
          hideOnSinglePage: false,
          showTotal: (total) => total,
        }}
      />
    </>
  );
}

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

const options = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];

// 不需要依赖刷新的 service: useRequest(getAllPeople)
// 需要依赖刷新的 service: useRequest(() => getAllPeople({ id }), { refreshDeps: [id] })

/** 处理接口返回的数据 */
function ProcessingData() {
  const { data } = useRequest(() => getAllPeople().then((origin) => ({ processed: 'processed', origin })));
  return <div>{data?.processed}</div>;
}
