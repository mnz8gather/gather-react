import { Tooltip } from 'antd';
import { forwardRef } from 'react';
import type { TooltipProps } from 'antd';

// --- 1. 定义 Wrapper 自己的 Props (不变) ---
interface TooltipOwnProps {
  tooltipProps?: TooltipProps;
}

// --- 2. 核心类型，现在将 ref 的类型也考虑进去 ---
// 我们需要一个辅助类型来获取 ref 的具体类型
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithoutRef<C>['ref']; // 这里不对不应该是 ComponentPropsWithoutRef 而且 ref 的提示是 (property) React.RefAttributes<unknown>.ref?: React.LegacyRef<unknown> | undefined

// Props 组合类型
type PolymorphicProps<C extends React.ElementType, Props = {}> = Props &
  TooltipOwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof (Props & TooltipOwnProps)>;

// --- 3. 最终的组件 Props 类型 ---
type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = {
  as?: C;
} & PolymorphicProps<C, Props>;

// --- 4. 实现组件，这次真正使用 forwardRef ---

// 我们需要一个内部实现函数，以便 TypeScript 能正确处理泛型
function TooltipWrapperInner<C extends React.ElementType = 'span'>(props: PolymorphicComponentProps<C>, ref: PolymorphicRef<C>) {
  const { as, tooltipProps, ...restProps } = props;

  const Component = as || 'span';

  // 将 ref 和其他 props 一起传递给最终渲染的组件
  const content = <Component {...restProps} ref={ref} />;

  return <Tooltip {...tooltipProps}>{content}</Tooltip>;
}

// --- 5. 使用 forwardRef 包装并导出 ---
// 这是一个小技巧，可以帮助 TypeScript 正确推断泛型 forwardRef 的类型
export const TooltipWrapper = forwardRef(TooltipWrapperInner);

type Proof = React.ElementRef<typeof TooltipWrapper>;
