import { forwardRef, useRef, useState } from 'react';
import { Button, Form, Input, Space, Switch, Tooltip } from 'antd';
import { GeneralTab } from '@/shared/GeneralTab';
import type { InputRef, TooltipProps } from 'antd';
import { TooltipWrapper } from './a';

const items = [
  {
    key: 'factory',
    label: 'factory',
  },
  {
    key: 'polymorphic',
    label: 'polymorphic',
  },
];

export function TooltipWrapperPage() {
  const [current, setCurrent] = useState('factory');

  return (
    <GeneralTab title='Tooltip wrapped component' items={items} value={current} onChange={setCurrent}>
      {current === 'factory' ? <Factory /> : null}
      {current === 'polymorphic' ? <Polymorphic /> : null}
    </GeneralTab>
  );
}

// --- 1. 定义 Wrapper 自己的 Props ---
interface WrapperProps {
  tooltipProps?: TooltipProps;
}

/**
 * 工厂函数
 * 创建一个带 Tooltip 功能的、类型安全的表单组件封装器。
 * @param Component - 需要被包裹的 React 组件 (e.g., Input, Select).
 * @returns 一个新的、完全类型化的组件，它接受被包裹组件的所有 props，并额外接受 `tooltip` 和 `placement` props.
 */
function createTooltipWrapper<T extends React.ElementType>(Component: T) {
  // 新组件的 props 类型是原始组件 props 与 WrapperProps 的结合
  type WrappedProps = React.ComponentPropsWithoutRef<T> & WrapperProps;
  type WrappedPropsMaybeSafe = React.ComponentPropsWithoutRef<T> extends object ? React.ComponentPropsWithoutRef<T> & WrapperProps : WrapperProps;

  const WrappedComponent = forwardRef<React.ElementRef<T>, WrappedProps>((props, ref) => {
    // 原始组件 props 如果含有 tooltipProps 会失效
    const { tooltipProps, ...restProps } = props;
    // as any 解决类型，需要后续查明原因
    const component = <Component {...(restProps as any)} ref={ref} />;
    return (
      <Tooltip {...tooltipProps}>
        {/**
         * 使用一个 span 包裹是必要的，因为像 Input.TextArea 这样的组件
         * 可能无法直接附加 Tooltip，而 span 可以确保 Tooltip 总有 DOM 元素可依附。
         *
         * span 会影响显示
         */}
        <span>{component}</span>
      </Tooltip>
    );
  });

  return WrappedComponent;
}

// Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
// function createTooltipWrapperWithoutRef<T extends React.ElementType>(Component: T) {
//   // 新组件的 props 类型是原始组件 props 与 WrapperProps 的结合
//   type cProps = React.ComponentPropsWithoutRef<T>;
//   type WrappedProps = cProps & WrapperProps;
//   function WrappedComponent(props: WrappedProps, ref: React.ElementRef<T>) {
//     const { tooltipProps, ...restProps } = props;
//     const component = <Component {...(restProps as any)} ref={ref} />;
//     return (
//       <Tooltip {...tooltipProps}>
//         <span>{component}</span>
//       </Tooltip>
//     );
//   }
//   return WrappedComponent;
// }

interface TooltipWrapperF1Props<C extends React.ElementType> {
  Component?: C;
  propsOfRC?: React.ComponentProps<C>;
  tooltipProps?: TooltipProps;
}

// the first one
function TooltipWrapperF1<C extends React.ElementType>(props: TooltipWrapperF1Props<C>) {
  const { Component, propsOfRC = {}, tooltipProps } = props;

  return (
    <Tooltip {...tooltipProps}>
      <span>{Component ? <Component {...(propsOfRC as any)} /> : null}</span>
    </Tooltip>
  );
}

type PolymorphicProps<C extends React.ElementType> = WrapperProps & Omit<React.ComponentPropsWithoutRef<C>, keyof WrapperProps>;

type PolymorphicPropsMaybeSafe<C extends React.ElementType> = (React.ComponentPropsWithoutRef<C> extends object
  ? Omit<React.ComponentPropsWithoutRef<C>, keyof WrapperProps>
  : {}) &
  WrapperProps;

type PolymorphicComponentProps<C extends React.ElementType> = { as?: C } & PolymorphicProps<C>;

function TooltipWrapperDefaultWithoutRef<C extends React.ElementType = 'span'>({ as, tooltipProps, ...restProps }: PolymorphicComponentProps<C>) {
  const Component = as || 'span';
  const content = <Component {...restProps} />;
  return <Tooltip {...tooltipProps}>{content}</Tooltip>;
}

const TooltipSwitch = createTooltipWrapper(Switch);
const TooltipInput = createTooltipWrapper(Input);
type RefProof = React.ElementRef<typeof TooltipInput>;

function Factory() {
  const factory_ref = useRef<InputRef>(null);
  return (
    <Form
      colon={false}
      onFinish={(values) => {
        console.log('values', values);
      }}
      labelCol={{ flex: '400px' }}
    >
      <Form.Item label='factory switch' name='factory_switch'>
        <TooltipSwitch tooltipProps={{ title: 'switch is not disabled' }} size='small' />
      </Form.Item>
      <Form.Item label='factory input' name='factory_input'>
        <TooltipInput tooltipProps={{ title: 'input is not disabled' }} showCount ref={factory_ref} />
      </Form.Item>
      <Form.Item label>
        <Space>
          <Button htmlType='submit'>提交</Button>
          <Button
            onClick={() => {
              factory_ref.current?.focus();
            }}
          >
            ref 测试
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

function Polymorphic() {
  const polymorphic_ref = useRef<InputRef>(null);
  return (
    <Form
      colon={false}
      onFinish={(values) => {
        console.log('values', values);
      }}
      labelCol={{ flex: '400px' }}
    >
      <Form.Item label='polymorphic switch' name='polymorphic_switch'>
        {/* 没有处理 ref */}
        <TooltipWrapperDefaultWithoutRef tooltipProps={{ title: 'input is not disabled' }} as={Switch} size='small' />
      </Form.Item>
      <Form.Item label='polymorphic input' name='polymorphic_input'>
        <TooltipWrapper tooltipProps={{ title: 'input is not disabled' }} as={Input} showCount ref={polymorphic_ref} />
      </Form.Item>
      <Form.Item label>
        <Space>
          <Button htmlType='submit'>提交</Button>
          <Button
            onClick={() => {
              polymorphic_ref.current?.focus();
            }}
          >
            ref 测试
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
