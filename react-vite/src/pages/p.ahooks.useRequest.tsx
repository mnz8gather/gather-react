import { useState } from 'react';
import { useRequest } from 'ahooks';
import { paradigm_user } from '@/services/paradigm';
import { GeneralContainer } from '@/share/GeneralContainer';
import { Select, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import type { ParadigmUserItem } from '@/services/paradigm';

// ahooks v3
// useRequest 第一个参数是返回 Promise 的函数。
export function UseRequestPage() {
  return (
    <GeneralContainer title='useRequest sample' bodyStyle={{ overflow: 'auto', display: 'flex', gap: '8px' }}>
      <Paging />
      <ModifyRes />
      <ModifyResAsyncWay />
    </GeneralContainer>
  );
}

/** 分页 */
function Paging() {
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  const [gender, setGender] = useState('');
  const service = () => paradigm_user({ ...pageInfo, gender });
  const { data, loading } = useRequest(service, { refreshDeps: [pageInfo, gender] });
  return (
    <Space direction='vertical'>
      <Select style={{ width: 120, marginRight: 16 }} onChange={setGender} value={gender} options={options} />
      <Table
        size='small'
        rowKey='email'
        loading={loading}
        columns={columns}
        dataSource={data?.result}
        pagination={{
          onChange: (page, size) => {
            setPageInfo({ page, size });
          },
          current: pageInfo.page,
          pageSize: pageInfo.size,
          total: data?.total ?? 0,
        }}
      />
    </Space>
  );
}

const columns: TableColumnsType<ParadigmUserItem> = [
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'gender',
    dataIndex: 'gender',
  },
];

const options = [
  { value: '', label: 'all' },
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
];

/** 修改接口返回的数据 */
function ModifyRes() {
  const service = () => paradigm_user({}).then((origin) => ({ extra: 'extra', origin }));
  const { data } = useRequest(service);
  return <div>{data?.extra}</div>;
}

/** 修改接口返回的数据, await 写法 */
function ModifyResAsyncWay() {
  const service = async () => {
    const origin = await paradigm_user({});
    return { extra: 'extra await', origin };
  };
  const { data } = useRequest(service);
  return <div>{data?.extra}</div>;
}
