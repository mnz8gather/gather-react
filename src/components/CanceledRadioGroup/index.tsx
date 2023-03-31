import { useState, useEffect } from 'react';
import { Radio } from 'antd';
import type { RadioChangeEvent, RadioGroupProps } from 'antd';

type CheckboxOptionType = Extract<Required<RadioGroupProps>['options'][number], object>;
export type CanceledRadioGroupOptions = Omit<CheckboxOptionType, 'onChange'>;

interface CanceledRadioGroupProps extends Omit<RadioGroupProps, 'options' | 'children' | 'onChange'> {
  options: CanceledRadioGroupOptions[];
  onChange?: (value: any) => void;
}

const CanceledRadioGroup = (props: CanceledRadioGroupProps) => {
  const { options, disabled, value, onChange, ...rest } = props;
  const [internalValue, setInternalValue] = useState(value);

  const internalOnChange = (e: RadioChangeEvent) => {
    setInternalValue(e?.target?.value);
  };

  let childrenToRender;
  if (options && options.length > 0) {
    childrenToRender = options.map((option) => {
      return (
        <Radio
          key={`radio-group-value-options-${option?.value}`}
          style={option?.style}
          value={option?.value}
          checked={value === option?.value}
          disabled={option?.disabled || disabled}
          onClick={() => {
            setInternalValue(undefined);
          }}
        >
          {option?.label}
        </Radio>
      );
    });
  }

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    onChange?.(internalValue);
  }, [internalValue]);

  return (
    <Radio.Group {...rest} onChange={internalOnChange} value={internalValue}>
      {childrenToRender}
    </Radio.Group>
  );
};

export default CanceledRadioGroup;
