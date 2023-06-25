import { useState } from 'react';
import { Radio, Checkbox } from 'antd';
import { useUpdateEffect } from 'ahooks';
import type { CheckboxOptionType } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

type CheckboxValueType = CheckboxOptionType['value'];

interface CanceledRadioGroupProps extends Omit<CheckboxGroupProps, 'onChange'> {
  onChange?: (value?: CheckboxValueType[]) => void;
}

const CanceledRadioGroup = (props: CanceledRadioGroupProps) => {
  const { options = [], children, value: component_value, onChange, defaultValue, ...rest } = props;
  const [internalValue, setInternalValue] = useState(() => {
    const temp_value = component_value || defaultValue;
    if (temp_value?.length !== undefined && temp_value.length > 1) {
      return [temp_value[0]];
    } else {
      return temp_value;
    }
  });

  const internalOnChange = (checkedValue: CheckboxValueType[]) => {
    if (internalValue !== undefined && checkedValue?.length < internalValue.length) {
      setInternalValue(undefined);
      return;
    }
    if (internalValue !== undefined && checkedValue?.length > internalValue.length) {
      const temp = checkedValue?.filter((ele) => !internalValue.includes(ele));
      setInternalValue(temp);
      return;
    }
    if (internalValue === undefined && checkedValue?.length === 1) {
      setInternalValue(checkedValue);
      return;
    }
  };

  const getOptions = () =>
    options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });

  let childrenToRender = children;

  if (options && options.length > 0) {
    childrenToRender = getOptions().map((option) => (
      <Checkbox prefixCls='ant-radio' key={option.value.toString()} {...option}>
        {option.label}
      </Checkbox>
    ));
  }

  useUpdateEffect(() => {
    onChange?.(internalValue);
  }, [internalValue]);

  return (
    <Checkbox.Group {...rest} onChange={internalOnChange} value={internalValue} prefixCls='ant-radio'>
      {childrenToRender}
      {/* antd5 cssinjs 可能有关，不加载样式 */}
      <Radio style={{ display: 'none' }} />
    </Checkbox.Group>
  );
};

export default CanceledRadioGroup;
