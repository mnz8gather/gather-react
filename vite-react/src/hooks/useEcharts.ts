import { useEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';

/**
 * echarts 的简易 hook
 * domRef 容器的 ref
 * echartsRef echarts 的实例
 */
export function useEcharts() {
  const domRef = useRef<HTMLDivElement>(null);
  const echartsRef = useRef<ECharts | null>(null);
  const size = useSize(domRef);

  useEffect(() => {
    if (domRef.current) {
      echartsRef.current = echarts.init(domRef.current);
    }
    return () => {
      echartsRef?.current?.dispose?.();
    };
  }, []);

  useEffect(() => {
    echartsRef?.current?.resize?.();
  }, [size]);

  return [domRef, echartsRef] as const;
}
