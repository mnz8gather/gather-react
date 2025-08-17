import { List } from 'antd';
import { useState } from 'react';
import { useInfiniteScroll } from 'ahooks';
import { getAllPeople } from '@/services/user';
import { GeneralTab } from '@/shared/GeneralTab';
import type { User } from '@/services/user';

const items = [
  {
    key: 'paging',
    label: '分页数据',
  },
];

export function UseInfiniteScrollPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='useInfiniteScroll' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Paging /> : null}
    </GeneralTab>
  );
}

interface Result {
  list: User[];
  total?: number;
  current?: number;
  pageSize?: number;
}

function getLoadMoreList(page: number, pageSize: number): Promise<Result> {
  return getAllPeople({ current: page, pageSize }).then((res) => ({
    list: res?.data,
    total: res?.total,
    current: page,
    pageSize,
  }));
}

function Paging() {
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      const current = d ? d?.current + 1 : 1;
      return getLoadMoreList(current, 10);
    },
    {
      isNoMore: (d) => {
        if (d === undefined) {
          return true;
        }
        return d?.current * d?.pageSize > d?.total;
      },
    },
  );
  return (
    <div>
      <List
        loading={loading}
        itemLayout='horizontal'
        dataSource={data?.list}
        renderItem={(item?: User) => (
          <List.Item key={item?.id}>
            <List.Item.Meta title={item?.name} description={item?.jobTitle} />
          </List.Item>
        )}
      />
      <div style={{ marginTop: 8 }}>
        {noMore ? (
          <span>No more data</span>
        ) : (
          <button type='button' onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading more...' : 'Click to load more'}
          </button>
        )}
      </div>
    </div>
  );
}
