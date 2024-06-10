import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface DeletedItemProps {
  value?: SelectProps['value'];
  onChange?: SelectProps['onChange'];
  style?: React.CSSProperties;
  options?: SelectProps['options'];
}

export function DeletedItem(props: DeletedItemProps) {
  const { onChange, value, style, options } = props;
  if (value === '_deleted') {
    return <del>已删除</del>;
  }
  return <Select value={value} onChange={onChange} style={style} options={options} />;
}
