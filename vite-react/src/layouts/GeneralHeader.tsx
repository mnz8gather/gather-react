type GeneralHeaderProps = React.HTMLProps<HTMLHeadingElement>;

// 常规标题组件
function GeneralHeader(props: GeneralHeaderProps) {
  const { ...restProps } = props;
  return <h2 {...restProps} />;
}

export default GeneralHeader;
