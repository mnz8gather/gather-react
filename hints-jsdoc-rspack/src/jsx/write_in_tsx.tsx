interface FunctionComponentProps extends React.HTMLProps<HTMLSpanElement> {
  a: string;
  b: string;
  c?: string;
}

function FunctionComponent(props: FunctionComponentProps) {
  const { a, b, c, ...spanProps } = props;
  return (
    <span {...spanProps}>
      {a}
      {b}
      {c}
    </span>
  );
}

export { FunctionComponent };
