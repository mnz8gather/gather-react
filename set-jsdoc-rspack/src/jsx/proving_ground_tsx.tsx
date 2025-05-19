interface FunctionComponentProps extends React.HTMLProps<HTMLSpanElement> {
  /** 字段的说明 */
  str: string;
  num: number;
  bool: boolean;
  optionalStr?: string;
}

/**
 * 组件 TypeScript 示例
 */
export function FunctionComponent(props: FunctionComponentProps) {
  const { str, num, bool, optionalStr, ...spanProps } = props;
  return (
    <div>
      <div>{str}</div>
      <span {...spanProps} />
    </div>
  );
}
