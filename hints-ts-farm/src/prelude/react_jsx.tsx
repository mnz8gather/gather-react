import React, { forwardRef } from 'react';
import type { JSX } from 'react';

// #region 类型
type _jsxe = JSX.Element;
type _rre = React.ReactElement;
type _ret = React.ElementType;
type _rct = React.ComponentType;
type _rhtmlp = React.HTMLProps<HTMLHeadingElement>;
type _rhtmla = React.HTMLAttributes<HTMLHRElement>;
type _rdhtmlp = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
type _rcssp = React.CSSProperties;
type _htmlule = HTMLUListElement;
type _rhtmla_htmlqe = React.HTMLAttributes<HTMLQuoteElement>;
type _rbhtmla_htmlqe = React.BlockquoteHTMLAttributes<HTMLQuoteElement>;

// #endregion

// #region forwardRef 使用泛型
// ====================================== 方法一 断言 ======================================
interface InputProps<T> {
  value: T;
  onChange: (value: T) => void;
}

function InputComponent<T>(props: InputProps<T>, ref: React.Ref<HTMLInputElement>) {
  const { value, onChange } = props;

  return (
    <input
      ref={ref}
      value={String(value)} // Assume value can be coerced to string
      onChange={(e) => onChange(e.target.value as unknown as T)}
    />
  );
}

type ForwardedInputComponentType = <T>(props: InputProps<T> & { ref?: React.Ref<HTMLInputElement> }) => React.ReactElement;

const ForwardedInputComponent = forwardRef(InputComponent) as ForwardedInputComponentType;

// ====================================== 方法二 函数返回 ======================================
interface Props<T> {
  data: T;
}

type GenericComponentInnerType = <T>(props: Props<T> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;

const GenericComponentInner: GenericComponentInnerType = <T,>({ data, ref }: Props<T> & { ref?: React.Ref<HTMLDivElement> }) => {
  return <div ref={ref}>Data: {JSON.stringify(data)}</div>;
};

function GenericComponent<T>() {
  return forwardRef<HTMLDivElement, Props<T>>((props, ref) => <GenericComponentInner {...props} ref={ref} />);
}

function App() {
  const ref = React.createRef<HTMLDivElement>();
  const GenericNumberComponent = GenericComponent<number>();

  return (
    <div>
      <GenericNumberComponent ref={ref} data={123} />
    </div>
  );
}
// #endregion forwardRef 使用泛型

/**
 * 类组件 使用 ref 并将 props 传递给 div 的情况
 *
 * Omit ref 避免类型冲突
 *
 * ref 会给类组件
 *
 * divRef 可以传递给相应的 div
 */
interface ClassRefProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
  divRef?: React.Ref<HTMLDivElement>;
}
