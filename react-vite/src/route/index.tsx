import { AudioPlayPage } from '@/pages/alpha.AudioPlay';
import { CustomLayout } from '@/share/CustomLayout';
import { BorderExtendedPage } from '@/pages/alpha.BorderExtended';
import { ChatBubblePage } from '@/pages/alpha.ChatBubble';
import { NotFound } from '@/pages/404';
import { HomePage } from '@/pages';
import type { CustomRouteObject } from 'shared-react-tsup';
import { DisplayRowPage } from '@/pages/alpha.DisplayRow';
import { DraggableModalPage } from '@/pages/alpha.DraggableModal';

export const routeConfig: CustomRouteObject[] = [
  {
    path: '/',
    element: <CustomLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        label: '首页',
      },
      {
        path: 'audio',
        element: <AudioPlayPage />,
        label: '音频',
      },
      {
        path: 'border',
        element: <BorderExtendedPage />,
        label: '画边线',
      },
      {
        path: 'chat-bubble',
        element: <ChatBubblePage />,
        label: '聊天气泡',
      },
      {
        path: 'display-row',
        element: <DisplayRowPage />,
        label: '展示行',
      },
      {
        path: 'draggable-modal',
        element: <DraggableModalPage />,
        label: '拖拽对话框',
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    notInMenu: true,
  },
];
