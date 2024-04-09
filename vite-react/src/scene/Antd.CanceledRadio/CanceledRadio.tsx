import { Checkbox, Radio } from 'antd';
import type { CheckboxProps } from 'antd';

function CanceledRadio(props: CheckboxProps) {
  return (
    <>
      <Checkbox {...props} prefixCls='ant-radio' />
      <Radio style={{ display: 'none' }} />
    </>
  );
}

export default CanceledRadio;
