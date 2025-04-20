import type { CustomRouteObject } from 'shared-react-tsup';
import { HomePage } from '@/pages';
import { NotFound } from '@/pages/404';
import { CustomLayout } from '@/share/CustomLayout';
import { AudioPlayPage } from '@/pages/a.AudioPlay';
import { ProvingGround } from '@/pages/ProvingGround';
import { DisplayRowPage } from '@/pages/a.DisplayRow';
import { ChatBubblePage } from '@/pages/a.ChatBubble';
import { GroupAvatarPage } from '@/pages/scene.GroupAvatar';
import { BorderExtendedPage } from '@/pages/a.BorderExtended';
import { DraggableModalPage } from '@/pages/a.DraggableModal';
import { FormListRenderTablePage } from '@/pages/s.FormListRenderTable';
import { ScrollLoadPage } from '@/pages/h.ScrollLoad';
import { RenderPropsPage } from '@/pages/p.RenderProps';

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
        path: 'alpha-proving-ground',
        element: <ProvingGround />,
        label: '试验场',
      },
      {
        path: 'alpha-audio',
        element: <AudioPlayPage />,
        label: '音频',
      },
      {
        path: 'alpha-border',
        element: <BorderExtendedPage />,
        label: '画边线',
      },
      {
        path: 'alpha-chat-bubble',
        element: <ChatBubblePage />,
        label: '聊天气泡',
      },
      {
        path: 'scene-group-avatar',
        element: <GroupAvatarPage />,
        label: '聊天组头像',
      },
      {
        path: 'alpha-display-row',
        element: <DisplayRowPage />,
        label: '展示行',
      },
      {
        path: 'alpha-draggable-modal',
        element: <DraggableModalPage />,
        label: '拖拽对话框',
      },
      {
        path: 'scene-form-list-render-table',
        element: <FormListRenderTablePage />,
        label: 'Form 中使用 Table',
      },
      {
        path: 'hook-scroll-load',
        element: <ScrollLoadPage />,
        label: '滚动加载',
      },
      {
        path: 'paradigm-render-props',
        element: <RenderPropsPage />,
        label: 'Render Props',
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
/* 

alpha.AudioPlay.tsx 音频
alpha.BorderExtended.tsx 画边线
alpha.ChatBubble.tsx 聊天气泡
alpha.DisplayRow.tsx 展示行
alpha.DraggableModal.tsx 拖拽对话框
class.ref.tsx react class 中使用 ref
hook.ScrollLoad.tsx 滚动加载

paradigm.CacheFunction.tsx react 函数缓存
paradigm.ClassComponent.tsx react class 组件
paradigm.ContentKit.tsx 内容套件
paradigm.ContentKit4Form.tsx 内容是表单的套件
paradigm.DataCollector.tsx 数据收集器
paradigm.MagicalEffect.tsx 多个表单收集数据
paradigm.PromiseValidate.tsx 校验和收集数据
paradigm.RefComponent.tsx React Ref
paradigm.RenderProp.tsx Render Props
paradigm.UseAntdTableCustomPagination.tsx useAntdTable
paradigm.UseAntdTableSample.tsx useAntdTable
paradigm.UseRequestSample.tsx useRequest
ProvingGround.tsx ProvingGround
scene.ActualMecha.tsx
scene.AlphaMecha.tsx
scene.AntdConfirmInput.tsx
scene.AntdFormControlTable.tsx
scene.AntdFormCustomizedComponent.tsx
scene.AntdFormDependencies.tsx
scene.AntdFormItemMultiElement.tsx
scene.AntdFormListDeleted.tsx
scene.AntdSaveInput.tsx
scene.AntdTableColumn.tsx
scene.AntdText.tsx
scene.BubbleTips.tsx
scene.CanceledRadio.Group.tsx
scene.ChatGroupList.tsx
scene.ChatList.tsx
scene.ChatScrollLoading.tsx
scene.CheckSortModal.tsx
scene.DndKitExSortGird.tsx
scene.DropdownSortButton.tsx
scene.DropdownSortButtonControlled.tsx
scene.FeelRcMotion.tsx
scene.GroupAvatar.tsx
scene.headlessui.tsx
scene.Low.tsx
scene.Marking.tsx
scene.MonacoEditor.tsx
scene.MonacoEditorCustomized.tsx
scene.MonacoEditorResize.tsx
scene.OptionalTag.tsx
scene.RcMotion.tsx
scene.ReactBeautifulDnd.tsx
StatisticBlock.tsx





*/
