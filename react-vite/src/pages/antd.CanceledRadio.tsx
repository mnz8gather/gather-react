import { useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Button, Checkbox, Form, Radio } from 'antd';
import { GeneralTab } from '@/shared/GeneralTab';
import type { CheckboxOptionType, CheckboxProps } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
  {
    key: 'group',
    label: '单选组合',
  },
];

export function CanceledRadioPage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='antd canceled radio' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <Sample /> : null}
      {current === 'group' ? <Group /> : null}
    </GeneralTab>
  );
}

function Sample() {
  return (
    <>
      <CanceledRadio>Radio</CanceledRadio>
    </>
  );
}

function InternalRadio(props: CheckboxProps) {
  return (
    <>
      <Checkbox {...props} prefixCls='ant-radio' />
      {/* antd v5 */}
      <Radio style={{ display: 'none' }} />
    </>
  );
}

type CheckboxValueType = CheckboxOptionType['value'];

interface CanceledRadioGroupProps extends Omit<CheckboxGroupProps, 'onChange'> {
  onChange?: (value?: CheckboxValueType[]) => void;
}

function CanceledRadioGroup(props: CanceledRadioGroupProps) {
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
      {/* antd5 不加载样式，可能与 cssinjs 有关 */}
      <Radio style={{ display: 'none' }} />
    </Checkbox.Group>
  );
}

const CanceledRadio = InternalRadio as typeof InternalRadio & { Group: typeof CanceledRadioGroup };
CanceledRadio.Group = CanceledRadioGroup;

const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];

function Group() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} colon={false} onFinish={onFinish}>
        <Form.Item label='fruits' name='fruits'>
          <CanceledRadio.Group options={options} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
