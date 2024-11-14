import { useEffect, useRef } from 'react';
import { extend, Runtime, plotlib, corelib } from '@antv/g2';
import { Renderer } from '@antv/g-svg';

export function G2TreeShaking() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const Chart = extend(Runtime, {
      'mark.liquid': plotlib()['mark.liquid'],
      'data.inline': corelib()['data.inline'],
      'mark.interval': corelib()['mark.interval'],
      'mark.text': corelib()['mark.text'],
      'theme.light': corelib()['theme.light'],
      'encode.field': corelib()['encode.field'],
      'coordinate.cartesian': corelib()['coordinate.cartesian'],
      'scale.identity': corelib()['scale.identity'],
      'scale.band': corelib()['scale.band'],
      'scale.linear': corelib()['scale.linear'],
      'animation.fadeIn': corelib()['animation.fadeIn'],
      'interaction.scrollbarFilter': corelib()['interaction.scrollbarFilter'],
      'interaction.legendFilter': corelib()['interaction.legendFilter'],
      'interaction.sliderFilter': corelib()['interaction.sliderFilter'],
      'interaction.tooltip': corelib()['interaction.tooltip'],
    });

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
