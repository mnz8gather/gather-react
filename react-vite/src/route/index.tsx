import type { CustomRouteObject } from 'shared-react-tsup';
import { HomePage } from '@/pages';
import { NotFound } from '@/pages/404';
import { CustomLayout } from '@/shared/CustomLayout';
import { AudioPlayPage } from '@/pages/AudioPlay';
import { ProvingGround } from '@/pages/ProvingGround';
import { DisplayRowPage } from '@/pages/DisplayRow';
import { ChatBubblePage } from '@/pages/ChatBubble';
import { ScrollLoadPage } from '@/pages/hook.ScrollLoad';
import { RenderPropsPage } from '@/pages.p/react.RenderProps';
import { GroupAvatarPage } from '@/pages/scene.GroupAvatar';
import { UseRequestPage } from '@/pages.p/ahooks.useRequest';
import { ClassComponentPage } from '@/pages.p/react.ClassComponent';
import { DraggableModalPage } from '@/pages/DraggableModal';
import { BorderExtendedPage } from '@/pages/BorderExtended';
import { FormListRenderTablePage } from '@/pages/s.FormListRenderTable';
import { StatisticBlockPage } from '@/pages/StatisticBlock';
import { RadioGroupDatePickerPage } from '@/pages/s.RadioGroupDatePicker';
import { UseInfiniteScrollPage } from '@/pages.p/ahooks.useInfiniteScroll';
import { UseControllableValuePage } from '@/pages.p/ahooks.useControllableValue';
import { UseUrlStatePage } from '@/pages.p/ahooks.useUrlState';

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
        path: 'alpha-statistic-block',
        element: <StatisticBlockPage />,
        label: '统计块',
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
      {
        path: 'paradigm-class-component',
        element: <ClassComponentPage />,
        label: 'Class 组件',
      },
      {
        path: 'paradigm-use-request',
        element: <UseRequestPage />,
        label: 'ahooks useRequest',
      },
      {
        path: 'scene-radio-group-date-picker',
        element: <RadioGroupDatePickerPage />,
        label: 'RadioGroup and DatePicker',
      },
      {
        path: 'paradigm-use-infinite-scroll',
        element: <UseInfiniteScrollPage />,
        label: 'ahooks useInfiniteScroll',
      },
      {
        path: 'paradigm-use-controllable-value',
        element: <UseControllableValuePage />,
        label: 'ahooks useControllableValue',
      },
      {
        path: 'paradigm-use-url-state',
        element: <UseUrlStatePage />,
        label: 'ahooks useUrlState',
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

/* 

paradigm.RefComponent.tsx React Ref
class.ref.tsx react class 中使用 ref

paradigm.UseAntdTableCustomPagination.tsx useAntdTable
paradigm.UseAntdTableSample.tsx useAntdTable


paradigm.CacheFunction.tsx react 函数缓存
paradigm.ContentKit.tsx 内容套件
paradigm.ContentKit4Form.tsx 内容是表单的套件
paradigm.DataCollector.tsx 数据收集器
paradigm.MagicalEffect.tsx 多个表单收集数据
paradigm.PromiseValidate.tsx 校验和收集数据

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



*/
