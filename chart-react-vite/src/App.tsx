import { useRef, useEffect } from 'react';
import { G2Canvas } from './G2Canvas';
import { G2Svg } from './G2Svg';

import * as d3 from 'd3';

const WaveChart = ({ percentage }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = width / 2;

    // 创建SVG画布
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height).style('border', '1px solid blue');

    // 清空之前的SVG内容
    svg.selectAll('*').remove();

    // 绘制水波
    const waveData = d3.range(0, 10, 0.1).map((d) => Math.sin(d + Math.PI) * 10 + radius * (percentage / 100));

    const line = d3
      .line()
      .x((d, i) => i * (width / waveData.length))
      .y((d) => height / 2 + d);

    // 绘制波浪线
    svg.append('path').datum(waveData).attr('fill', 'none').attr('stroke', 'blue').attr('stroke-width', 2).attr('d', line);

    // 创建圆形路径
    svg.append('circle').attr('cx', radius).attr('cy', radius).attr('r', radius).attr('fill', 'white').attr('stroke', 'blue').attr('stroke-width', 3);

    // 添加百分比文本
    svg
      .append('text')
      .attr('x', radius)
      .attr('y', radius)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '24px')
      .attr('fill', 'grey')
      .text(`${percentage} %`);
  }, [percentage]);

  return <svg ref={svgRef}></svg>;
};

function App() {
  return (
    <>
      <WaveChart percentage={30} />
      <G2Canvas />
      <G2Svg />
      {/* <G2Webgl /> */}
      <AntdChartsCanvas />
    </>
  );
}

export default App;
