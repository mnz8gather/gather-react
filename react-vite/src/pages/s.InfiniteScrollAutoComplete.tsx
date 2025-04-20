import { AutoComplete } from 'antd';
import { useRequest, useMemoizedFn } from 'ahooks';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { AutoCompleteProps } from 'antd';

/** InfiniteScrollAutoCompleteData */
export type ISACData = { list: Required<AutoCompleteProps>['options']; [key: string]: any };

type Service<TData extends ISACData> = (query?: string, currentData?: TData) => Promise<TData>;

interface InfiniteScrollAutoCompleteProps<TData extends ISACData> extends Omit<AutoCompleteProps, 'options' | 'onPopupScroll' | 'onSearch'> {
  service: Service<TData>;
  isNoMore?: (data?: TData) => boolean;
  threshold?: number;
  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (e: Error) => void;
  onFinally?: (data?: TData, e?: Error) => void;
}

/** 
 * 使用示例
```tsx
interface ExampleData extends ISACData {
  total?: number;
  page?: number;
  pageSize?: number;
}

function Example() {
  const dataService = useCallback<InfiniteScrollAutoCompleteProps<ExampleData>['service']>(async (query, lastData) => {
    const page = lastData?.page !== undefined ? lastData?.page + 1 : 1;
    const pageSize = 30;
    const res = await getData({
      page,
      query,
      pageSize,
    });
    const data: any[] = res?.data ?? [];
    const list: ExampleData['list'] = data.map((item) => {
      return { label: item?.id, value: item?.id };
    });
    return { list, total: res?.total ?? list?.length, page, pageSize };
  }, []);
  const dataIsNoMore = useCallback<Required<InfiniteScrollAutoCompleteProps<ExampleData>>['isNoMore']>((data) => {
    if (data?.page !== undefined && data?.pageSize !== undefined && data?.total !== undefined) {
      return data?.page * data?.pageSize > data?.total;
    }
    return false;
  }, []);
  return <InfiniteScrollAutoComplete<ExampleData> style={{ width: 300 }} service={dataService} isNoMore={dataIsNoMore} />;
}
```
 */
export function InfiniteScrollAutoComplete<TData extends ISACData>(props: InfiniteScrollAutoCompleteProps<TData>) {
  const { service, isNoMore, threshold = 100, onBefore, onSuccess, onError, onFinally, ...restProps } = props;
  const scrollContainerRef = useRef<HTMLDivElement>();
  const [query, setQuery] = useState<string>();
  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);
  const { loading, run } = useRequest(
    async (query?: string, lastData?: TData) => {
      const currentData = await service(query, lastData);
      if (!lastData) {
        setFinalData({
          ...currentData,
          list: [...(currentData.list ?? [])],
        });
      } else {
        setFinalData({
          ...currentData,
          list: [...(lastData.list ?? []), ...currentData.list],
        });
      }
      return currentData;
    },
    {
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => onSuccess?.(d),
      onError: (e) => onError?.(e),
    },
  );

  const noMore = useMemo(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData);
  }, [finalData]);

  const loadMore = useMemoizedFn(() => {
    if (noMore) {
      return;
    }
    setLoadingMore(true);
    run(query, finalData);
  });

  const onPopupScroll = useCallback<Required<AutoCompleteProps>['onPopupScroll']>(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (scrollContainerRef.current === undefined) {
        scrollContainerRef.current = event?.currentTarget;
      }
      if (loading || loadingMore) {
        return;
      }
      const scrollTop = event?.currentTarget?.scrollTop;
      const scrollHeight = event?.currentTarget?.scrollHeight;
      const clientHeight = event?.currentTarget?.clientHeight;
      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        loadMore();
      }
    },
    [loading, loadingMore],
  );

  return (
    <AutoComplete
      {...restProps}
      options={finalData?.list}
      onPopupScroll={onPopupScroll}
      onSearch={(value) => {
        // 滚回顶部，减少请求次数
        // behavior: "smooth" 这个是异步的，不要加。如果要加，需要进行特殊处理。
        scrollContainerRef.current?.scrollTo({ top: 0 });
        setQuery(value);
        run(value);
      }}
    />
  );
}
