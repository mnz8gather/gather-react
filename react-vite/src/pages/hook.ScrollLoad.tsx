import { useRef } from 'react';
import { useRequest } from 'ahooks';
import { Button, Space } from 'antd';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { useChatScroll } from '@/hooks-fork/useChatScroll';

interface Result {
  list: string[];
  nextId: string | undefined;
  newId: string | undefined;
}

const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

function getLoadMoreList(nextId: string | undefined, limit: number): Promise<Result> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end);
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
        newId: undefined,
      });
    }, 1000);
  });
}

function deleteItem(id: string) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function ScrollLoad() {
  const ref = useRef<HTMLDivElement>(null);

  const { data, loading, loadMore, loadingMore, mutate } = useChatScroll((d) => getLoadMoreList(d?.nextId, 4), {
    target: ref,
    isNoMore: (d) => {
      return d?.nextId === undefined;
    },
    // isNoNew: (d) => {
    //   console.log('isNoNew');
    //   return d?.newId === undefined;
    // },
  });

  const {
    loading: deleteLading,
    params: deleteParams,
    run: remove,
  } = useRequest(deleteItem, {
    manual: true,
    onSuccess: (_, [id]) => {
      if (data) {
        const index = data.list.findIndex((i) => i === id);
        data?.list.splice(index, 1, 'haha');
        // console.log(data);
        mutate({ ...data });
      }
    },
  });

  function addNew() {
    if (data) {
      data?.list.unshift(Math.random().toString(36).slice(-6));
      mutate({ ...data });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div ref={ref} style={{ height: 150, overflow: 'auto', border: '1px solid', padding: 12 }}>
        {loading ? (
          <p>loading</p>
        ) : (
          <div>
            {data?.list?.map((item) => (
              <div key={item} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
                item-{item}
                <button style={{ marginLeft: 8 }} onClick={() => remove(item)} disabled={deleteLading && deleteParams[0] === item}>
                  Change
                </button>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 8 }}>
          {data?.nextId && (
            <button type='button' onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading more...' : 'Click to load more'}
            </button>
          )}
          {!data?.nextId && <span>No more data</span>}
        </div>
      </div>
      <Space>
        <Button
          onClick={() => {
            addNew();
          }}
        >
          增加新数据
        </Button>
      </Space>
    </div>
  );
}

export function ScrollLoadPage() {
  return (
    <GeneralContainer title='滚动加载 (改 ahooks useInfiniteScroll)'>
      <ScrollLoad />
    </GeneralContainer>
  );
}
