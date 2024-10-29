import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

export function G2Canvas() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chart = new Chart({
      container: ref.current!,
      autoFit: true,
    });

    chart.liquid().data(0.5).style({
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    });

    chart.render();
  }, []);
  return <div ref={ref} />;
}
