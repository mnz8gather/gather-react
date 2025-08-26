import { useMemo, useState } from 'react';
import { useEventListener, useMemoizedFn, useRequest, useUpdateEffect } from 'ahooks';
import { getTargetElement } from 'ahooks/es/utils/domTarget';
import { getClientHeight, getScrollHeight, getScrollTop } from 'ahooks/es/utils/rect';
import type { Data, InfiniteScrollOptions, Service } from '@/hooks-fork/useChatScroll/types';

/**
 * from a06965a611c766081c83f7ceaaf054b81e44834a
 *      April 27, 2022 at 4:58 PM
 *      fix: useInfiniteScroll add nomore for loadMore
 *
 * 增加了 isNoNew loadingNew scrollPosition
 *
 * 最初的目的是 处理 ahooks useInfiniteScroll 的问题
 */
const useInfiniteScroll = <TData extends Data>(service: Service<TData>, options: InfiniteScrollOptions<TData> = {}) => {
  const { target, isNoMore, threshold = 100, reloadDeps = [], manual, onBefore, onSuccess, onError, onFinally, isNoNew } = options;

  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingNew, setLoadingNew] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<number>();

  const noMore = useMemo(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData);
  }, [finalData]);

  const noNew = useMemo(() => {
    if (!isNoNew) return true;
    return isNoNew(finalData);
  }, [finalData]);

  const { loading, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      // console.log(lastData);

      const currentData = await service(lastData);
      if (!lastData) {
        setFinalData(currentData);
      } else {
        setFinalData({
          ...currentData,
          // @ts-ignore
          list: [...lastData.list, ...currentData.list],
        });
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        setLoadingNew(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          scrollMethod();
        });
        onSuccess?.(d);
      },
      onError: (e) => onError?.(e),
    },
  );

  const loadMore = () => {
    if (noMore) return;
    setLoadingMore(true);
    run(finalData);
  };

  const loadNew = () => {
    if (noNew) return;
    setLoadingNew(true);
    run(finalData);
  };

  const loadMoreAsync = () => {
    if (noMore) return Promise.reject();
    setLoadingMore(true);
    return runAsync(finalData);
  };

  const reload = () => run();
  const reloadAsync = () => runAsync();

  const scrollMethod = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);
    setScrollPosition(scrollTop);

    if (scrollPosition !== undefined && scrollTop < scrollPosition && scrollTop < threshold) {
      loadNew();
    }

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMore();
    }
  };

  useEventListener(
    'scroll',
    () => {
      if (loading || loadingMore || loadingNew) {
        return;
      }
      scrollMethod();
    },
    { target },
  );

  useUpdateEffect(() => {
    run();
  }, [...reloadDeps]);

  return {
    data: finalData,
    loading: !loadingMore && loading,
    loadingMore,
    loadingNew,
    noMore,

    loadMore: useMemoizedFn(loadMore),
    loadMoreAsync: useMemoizedFn(loadMoreAsync),
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel,
  };
};

export { useInfiniteScroll as useChatScroll };
