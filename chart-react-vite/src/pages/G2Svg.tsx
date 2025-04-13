import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import { Renderer } from '@antv/g-svg';

export function G2Svg() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chart = new Chart({
      container: ref.current!,
      autoFit: true,
      renderer: new Renderer(),
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
