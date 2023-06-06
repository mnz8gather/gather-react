import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

function CanceledRadio(props: CheckboxProps) {
  return <Checkbox {...props} prefixCls="ant-radio" />;
}

export default CanceledRadio;
