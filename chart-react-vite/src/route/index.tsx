import type { CustomRouteObject } from 'shared-react-tsup';
import { NotFound } from '@/pages/404';
import { AppLayout } from './layout';
import { Home } from '@/pages/home';

export const routeConfig: CustomRouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        label: '首页',
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    notInMenu: true,
  },
];
