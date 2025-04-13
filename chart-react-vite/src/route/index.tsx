import type { CustomRouteObject } from 'shared-react-tsup';
import { HomePage } from '@/pages';
import { AppLayout } from './layout';
import { G2Svg } from '@/pages/G2Svg';
import { NotFound } from '@/pages/404';
import { G2Webgl } from '@/pages/G2Webgl';
import { G2Canvas } from '@/pages/G2Canvas';
import { GraphPage } from '@/pages/echarts.Graph';
import { G2TreeShaking } from '@/pages/G2TreeShaking';
import { MapScatter } from '@/pages/MaptalksWithECharts.ScatterMap';

export const routeConfig: CustomRouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        label: '首页',
      },
      {
        path: 'echarts-graph',
        element: <GraphPage />,
        label: 'Echarts 关系图',
      },
      {
        path: 'maptalks-echarts-scatter',
        element: <MapScatter />,
        label: 'Maptalks 和 Echarts 散点图',
      },
      {
        path: 'g2-canvas',
        element: <G2Canvas />,
        label: 'G2 Canvas',
      },
      {
        path: 'g2-svg',
        element: <G2Svg />,
        label: 'G2 Svg',
      },
      {
        path: 'g2-webgl',
        element: <G2Webgl />,
        label: 'G2 Webgl',
      },
      {
        path: 'g2-tree-shaking',
        element: <G2TreeShaking />,
        label: 'G2 TreeShaking',
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
