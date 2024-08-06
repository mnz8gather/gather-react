import { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'ahooks';
import { Select, Table } from 'antd';
import { paradigm_user } from '@/services/paradigm';
import type { TableColumnsType } from 'antd';
import type { ParadigmUserItem } from '@/services/paradigm';

/**
 * useRequest 分页请求情况
 */
export function UseRequestSample() {
  // 分页参数
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });
  // 筛选参数
  const [gender, setGender] = useState('');

  const { data, loading } = useRequest(() => paradigm_user({ ...pageInfo, gender }), { refreshDeps: [pageInfo, gender] });

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
      {
        title: 'country',
        dataIndex: 'country',
      },
    ];

    return columnsInternal;
  }, []);

  return (
    <>
      <Select style={{ width: 120, marginRight: 16 }} onChange={setGender} value={gender}>
        <Select.Option value=''>all</Select.Option>
        <Select.Option value='male'>male</Select.Option>
        <Select.Option value='female'>female</Select.Option>
      </Select>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data?.result}
        rowKey='email'
        pagination={{
          onChange: (page, size) => {
            setPageInfo({ page, size });
          },
          current: pageInfo.page,
          pageSize: pageInfo.size,
          total: data?.total ?? 0,
        }}
      />
      <ModifyData />
      <ModifyDataAsync />
    </>
  );
}

// 修改接口返回的数据
function ModifyData() {
  const { data } = useRequest(() => {
    return paradigm_user({}).then((origin) => ({ extra: 'extra', origin }));
  });

  useEffect(() => {
    console.log('ModifyData data', data);
  }, [data]);

  return <>ModifyData</>;
}

// async 的写法
function ModifyDataAsync() {
  const { data } = useRequest(async () => {
    const origin = await paradigm_user({});
    return { extra: 'extra', origin };
  });

  useEffect(() => {
    console.log('ModifyDataAsync data', data);
  }, [data]);

  return <>ModifyDataAsync</>;
}
