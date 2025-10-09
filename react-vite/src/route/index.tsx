import type { CustomRouteObject } from 'shared-react-tsup';
import { HomePage } from '@/pages';
import { NotFound } from '@/pages/404';
import { MonacoPage } from '@/pages/monaco';
import { RefPage } from '@/pages.p/react.Ref';
import { AntdRowPage } from '@/pages/antd.Row';
import { DatasetPage } from '@/pages.p/dataset';
import { AntdFormPage } from '@/pages/antd.Form';
import { AudioPlayPage } from '@/pages/AudioPlay';
import { AntdInputPage } from '@/pages/antd.Input';
import { AntdTablePage } from '@/pages/antd.Table';
import { DisplayRowPage } from '@/pages/DisplayRow';
import { ChatBubblePage } from '@/pages/ChatBubble';
import { AntdButtonPage } from '@/pages/antd.Button';
import { ProvingGround } from '@/pages/ProvingGround';
import { AntdTooltipPage } from '@/pages/antd.Tooltip';
import { ScrollLoadPage } from '@/pages/hook.ScrollLoad';
import { SplitterLayout } from '@/shared/SplitterLayout';
import { DraggableModalPage } from '@/pages/DraggableModal';
import { BorderExtendedPage } from '@/pages/BorderExtended';
import { StatisticBlockPage } from '@/pages/StatisticBlock';
import { GroupAvatarPage } from '@/pages/scene.GroupAvatar';
import { UseRequestPage } from '@/pages.p/ahooks.useRequest';
import { RenderPropsPage } from '@/pages.p/react.RenderProps';
import { TooltipWrapperPage } from '@/BX/antd.TooltipWrapper';
import { UseUrlStatePage } from '@/pages.p/ahooks.useUrlState';
import { CanceledRadioPage } from '@/pages/antd.CanceledRadio';
import { UseAntdTablePage } from '@/pages.p/ahooks.useAntdTable';
import { ClassComponentPage } from '@/pages.p/react.ClassComponent';
import { FormListRenderTablePage } from '@/pages/FormListRenderTable';
import { RadioGroupDatePickerPage } from '@/pages/RadioGroupDatePicker';
import { UseInfiniteScrollPage } from '@/pages.p/ahooks.useInfiniteScroll';
import { UseAntdTableIssuePage } from '@/pages.p/ahooks.useAntdTable.issue';
import { UseControllableValuePage } from '@/pages.p/ahooks.useControllableValue';
import { AutoCompleteInfiniteScrollPage } from '@/pages/antd.AutoCompleteInfiniteScroll';

export const routeConfig: CustomRouteObject[] = [
  {
    path: '/',
    element: <SplitterLayout />,
    children: [
      {
        path: 'proving-ground',
        element: <ProvingGround />,
        label: '试验场',
      },
      {
        path: 'monaco',
        element: <MonacoPage />,
        label: 'Monaco',
      },
      {
        path: 'antd-form',
        element: <AntdFormPage />,
        label: 'antd Form',
      },
      {
        path: 'antd-table',
        element: <AntdTablePage />,
        label: 'antd Table',
      },
      {
        path: 'antd-tooltip',
        element: <AntdTooltipPage />,
        label: 'antd Tooltip',
      },
      {
        path: 'antd-tooltip-wrapper',
        element: <TooltipWrapperPage />,
        label: 'antd Tooltip wrapped component',
      },
      {
        path: 'antd-auto-complete-infinite-scroll',
        element: <AutoCompleteInfiniteScrollPage />,
        label: 'antd AutoComplete Infinite Scroll',
      },
      {
        path: 'antd-button',
        element: <AntdButtonPage />,
        label: 'antd Button',
      },
      {
        path: 'antd-input',
        element: <AntdInputPage />,
        label: 'antd Input',
      },
      {
        path: 'antd-row',
        element: <AntdRowPage />,
        label: 'antd Row Col',
      },
      {
        path: 'paradigm-use-request',
        element: <UseRequestPage />,
        label: 'ahooks useRequest',
      },
      {
        path: 'paradigm-use-antd-table',
        element: <UseAntdTablePage />,
        label: 'ahooks useAntdTable',
      },
      {
        path: 'issue-use-antd-table',
        element: <UseAntdTableIssuePage />,
        label: 'ahooks useAntdTable issues',
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
      {
        path: 'paradigm-dataset',
        element: <DatasetPage />,
        label: 'dataset',
      },
      {
        path: 'paradigm-class-component',
        element: <ClassComponentPage />,
        label: 'React Class 组件',
      },
      {
        path: 'paradigm-render-props',
        element: <RenderPropsPage />,
        label: 'React Render Props',
      },
      {
        path: 'antd-canceled-radio',
        element: <CanceledRadioPage />,
        label: 'antd canceled radio',
      },
      {
        path: 'form-list-render-table',
        element: <FormListRenderTablePage />,
        label: 'Form 中使用 Table',
      },
      {
        path: 'radio-group-date-picker',
        element: <RadioGroupDatePickerPage />,
        label: 'RadioGroup and DatePicker',
      },
      {
        index: true,
        element: <HomePage />,
        label: '首页',
      },
      {
        path: 'paradigm-ref',
        element: <RefPage />,
        label: 'React Ref',
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
        path: 'hook-scroll-load',
        element: <ScrollLoadPage />,
        label: '滚动加载',
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
