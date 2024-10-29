interface FunctionComponentProps extends React.HTMLProps<HTMLSpanElement> {
  fcS: string;
  fcN: number;
  fcB: boolean;
  fcU?: string;
}

function FunctionComponent(props: FunctionComponentProps) {
  const { fcS, fcN, fcB, fcU, ...spanProps } = props;
  return (
    <div>
      <div>{fcS}</div>
      <span {...spanProps} />
    </div>
  );
}

export { FunctionComponent };
