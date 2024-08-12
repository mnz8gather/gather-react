/** fork https://github.com/alibaba/hooks/issues/2324 */
import { useSize } from 'ahooks';
import { useEffect, useState, useMemo, UIEvent, useRef } from 'react';

export interface OptionType<T> {
  itemHeight: number | ((data: T, index: number) => number);
  overscan?: number;
  onScroll?: (e: UIEvent<HTMLElement>) => void;
}

export const useVirtualList = <T>(originalList: T[], options: OptionType<T>, deps: any[] = []) => {
  const { itemHeight, overscan = 5, onScroll } = options;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const size = useSize(scrollerRef);
  const [range, setRange] = useState({ start: 0, end: 10 });

  useEffect(() => {
    getListRange();
  }, [size?.width, size?.height, originalList.length]);

  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return originalList.length * itemHeight;
    }
    return originalList.reduce((sum, data, index) => sum + itemHeight(data, index), 0);
  }, [originalList.length, ...deps]);

  const list = useMemo(
    () =>
      originalList.slice(range.start, range.end).map((ele, index) => ({
        data: ele,
        index: index + range.start,
      })),
    [originalList, range],
  );

  const getListRange = () => {
    const element = scrollerRef.current;
    if (element) {
      const offset = getRangeOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);

      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      setRange({
        start: from < 0 ? 0 : from,
        end: to > originalList.length ? originalList.length : to,
      });
    }
  };

  const getViewCapacity = (scrollerHeight: number) => {
    if (typeof itemHeight === 'number') {
      return Math.ceil(scrollerHeight / itemHeight);
    }
    const { start = 0 } = range;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < originalList.length; i++) {
      const height = (itemHeight as (data: T, index: number) => number)(originalList[i], i);
      sum += height;
      capacity = i;
      if (sum >= scrollerHeight) {
        break;
      }
    }
    return capacity - start;
  };

  const getRangeOffset = (scrollTop: number) => {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < originalList.length; i++) {
      const height = (itemHeight as (data: T, index: number) => number)(originalList[i], i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  const getDistanceTop = (index: number) => {
    if (typeof itemHeight === 'number') {
      const height = index * itemHeight;
      return height;
    }
    const height = originalList.slice(0, index).reduce((sum, data, index) => sum + itemHeight(data, index), 0);
    return height;
  };

  const scrollTo = (index: number) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = getDistanceTop(index);
      getListRange();
    }
  };

  return {
    list,
    scrollTo,
    scrollerRef,
    scrollerProps: {
      ref: scrollerRef,
      onScroll: (e: UIEvent<HTMLElement>) => {
        e.preventDefault();
        getListRange();
        if (onScroll) {
          onScroll(e);
        }
      },
      style: { overflowY: 'auto' } as { overflowY: 'auto' },
    },
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight,
        paddingTop: getDistanceTop(range.start),
      },
    },
  };
};
