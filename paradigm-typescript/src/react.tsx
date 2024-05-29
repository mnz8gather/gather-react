import React, { ForwardRefRenderFunction, forwardRef } from 'react';

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

const ForwardedInputComponent = forwardRef(InputComponent) as <T>(props: InputProps<T> & { ref?: React.Ref<HTMLInputElement> }) => React.ReactElement;

// ========================================================================================

interface Props<T> {
  data: T;
}

// 创建一个泛型的 ForwardRefRenderFunction
const GenericComponentInner: <T>(props: Props<T> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element = <T,>({
  data,
  ref,
}: Props<T> & { ref?: React.Ref<HTMLDivElement> }) => {
  return <div ref={ref}>Data: {JSON.stringify(data)}</div>;
};

// 使用 forwardRef，注意：此处不能直接传递泛型
function GenericComponent<T>() {
  return forwardRef<HTMLDivElement, Props<T>>((props, ref) => <GenericComponentInner {...props} ref={ref} />);
}

export default GenericComponent;

function App() {
  const ref = React.createRef<HTMLDivElement>();
  const GenericNumberComponent = GenericComponent<number>();

  return (
    <div>
      <GenericNumberComponent ref={ref} data={123} />
    </div>
  );
}
