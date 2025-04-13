import { useEffect, useMemo, useState } from 'react';
import { useEcharts } from '@/hooks/useEcharts';
import type { EChartsOption } from 'echarts';
import styles from './echarts.Graph.module.scss';

export function GraphPage() {
  const [domRef, echartsRef] = useEcharts();
  const [clickInfo, setClickInfo] = useState<any>();

  const option: EChartsOption = useMemo(
    () => ({
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: graph.nodes,
          links: graph.links,

          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: '#3dd67a', // 0% 处的颜色
                },
                {
                  offset: 0.7,
                  color: '#3dd67a', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#95dcb2', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          label: {
            show: true,
            position: 'bottom',
            distance: 5,
            fontSize: 18,
            align: 'center',
          },
          autoCurveness: 0.01,
          edgeLabel: {
            show: true,
            position: 'middle',
            fontSize: 12,
            formatter: (params) => {
              return (params.data as any).relation.name;
            },
          },
          // edgeSymbol: ['circle', 'arrow'],
          force: {
            repulsion: 100,
            gravity: 0.01,
            edgeLength: 200,
          },
          roam: true,
        },
      ],
    }),
    [graph]
  );

  useEffect(() => {
    const echartsInstance = echartsRef.current;
    echartsInstance?.setOption(option);
    echartsInstance?.on('click', (params) => {
      setClickInfo(params?.data);
    });
  }, [option]);

  return (
    <div style={{ height: '100%', padding: '16px 0', display: 'flex' }}>
      <div ref={domRef} style={{ width: '100%', height: '100%', backgroundColor: '#fff' }} />
      <div className={styles['current-info']}>
        <div className="text-row">
          <span className="row-item-left">姓名</span>
          <span className="row-item-right">{clickInfo?.name}</span>
        </div>
        <div className="text-row">
          <span className="row-item-left">数字号码</span>
          <span className="row-item-right">{clickInfo?.id}</span>
        </div>
      </div>
    </div>
  );
}

const graph = {
  nodes: [
    {
      id: '0',
      name: 'Myriel',
      symbolSize: 60,
    },
    {
      id: '1',
      name: 'Napoleon',
      symbolSize: 60,
    },
    {
      id: '2',
      name: 'MlleBaptistine',
      symbolSize: 60,
    },
    {
      id: '3',
      name: 'MmeMagloire',
      symbolSize: 60,
    },
    {
      id: '4',
      name: 'CountessDeLo',
      symbolSize: 60,
    },
    {
      id: '5',
      name: 'Geborand',
      symbolSize: 60,
    },
    {
      id: '6',
      name: 'Champtercier',
      symbolSize: 60,
    },
    {
      id: '7',
      name: 'Cravatte',
      symbolSize: 60,
    },
    {
      id: '8',
      name: 'Count',
      symbolSize: 60,
    },
    {
      id: '9',
      name: 'OldMan',
      symbolSize: 60,
    },
    {
      id: '10',
      name: 'Labarre',
      symbolSize: 60,
    },
    {
      id: '11',
      name: 'Valjean',
      symbolSize: 60,
    },
    {
      id: '12',
      name: 'Marguerite',
      symbolSize: 60,
    },
    {
      id: '13',
      name: 'MmeDeR',
      symbolSize: 60,
    },
    {
      id: '14',
      name: 'Isabeau',
      symbolSize: 60,
    },
    {
      id: '15',
      name: 'Gervais',
      symbolSize: 60,
    },
    {
      id: '16',
      name: 'Tholomyes',
      symbolSize: 60,
    },
    {
      id: '17',
      name: 'Listolier',
      symbolSize: 60,
    },
    {
      id: '18',
      name: 'Fameuil',
      symbolSize: 60,
    },
    {
      id: '19',
      name: 'Blacheville',
      symbolSize: 60,
    },
    {
      id: '20',
      name: 'Favourite',
      symbolSize: 60,
    },
  ],
  links: [
    {
      source: '1',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '2',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '3',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '3',
      target: '2',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '4',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '5',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '6',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '7',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '8',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '9',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '11',
      target: '0',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '11',
      target: '2',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '11',
      target: '3',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '11',
      target: '10',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '12',
      target: '11',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '13',
      target: '11',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '14',
      target: '11',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '15',
      target: '11',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '17',
      target: '16',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '18',
      target: '16',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '18',
      target: '17',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '19',
      target: '16',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '19',
      target: '17',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '19',
      target: '18',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '20',
      target: '16',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '20',
      target: '17',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '20',
      target: '18',
      relation: {
        name: '老婆',
      },
    },
    {
      source: '20',
      target: '19',
      relation: {
        name: '老婆',
      },
    },
  ],
};
