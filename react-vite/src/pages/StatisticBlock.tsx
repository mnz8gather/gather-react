interface StatisticBlockProps {
  label?: React.ReactNode;
  content?: React.ReactNode;
  style?: React.CSSProperties;
  styles?: {
    label?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  className?: string;
  classNames?: {
    label?: string;
    content?: string;
  };
}

export function StatisticBlock(props: StatisticBlockProps) {
  const { className, classNames: customClassNames, label, content, style, styles: customStyles } = props;

  let labelBlock: React.ReactNode, RightBlock: React.ReactNode;

  if (label !== false) {
    labelBlock = (
      <div style={customStyles?.label} className={customClassNames?.label}>
        {label}
      </div>
    );
  }

  if (content !== false) {
    RightBlock = (
      <div style={customStyles?.content} className={customClassNames?.content}>
        {content}
      </div>
    );
  }

  return (
    <div style={style} className={className}>
      {labelBlock}
      {RightBlock}
    </div>
  );
}

function StatisticBlockHorizontal(props: StatisticBlockProps) {
  return (
    <StatisticBlock
      {...props}
      style={{ display: 'flex', alignItems: 'center', ...props?.style }}
      styles={{
        label: { fontSize: '20px', ...props?.styles?.label },
        content: { marginLeft: '20px', ...props?.styles?.content },
      }}
    />
  );
}

function StatisticBlockVertical(props: StatisticBlockProps) {
  return (
    <StatisticBlock
      {...props}
      styles={{
        label: { fontSize: '16px', textAlign: 'center', ...props?.styles?.label },
        content: { fontSize: '16px', textAlign: 'center', ...props?.styles?.content },
      }}
    />
  );
}

StatisticBlock.Horizontal = StatisticBlockHorizontal;
StatisticBlock.Vertical = StatisticBlockVertical;
