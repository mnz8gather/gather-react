import { useMemo, useState } from 'react';
import { useRequest } from 'ahooks';
import { Table } from 'antd';
import { paradigm_user } from '@/services/paradigm';
import type { TableColumnsType } from 'antd';
import type { ParadigmUserItem } from '@/services/paradigm';

/**
 * useRequest 分页请求情况
 */
export default function UseRequestSample() {
  // 分页参数
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10 });

  const { data, loading } = useRequest(() => paradigm_user({ ...pageInfo }), { refreshDeps: [pageInfo] });

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
    </>
  );
}
