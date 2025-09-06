import { useCallback, useState } from 'react';
import { omit, pick } from 'lodash';
import { Button, Form, Input, Select, Space, Switch } from 'antd';
import { useControllableValue } from 'ahooks';
import { GeneralTab } from '@/shared/GeneralTab';
import type { InputProps, SelectProps, SwitchProps } from 'antd';

const items = [
  {
    key: 'sample',
    label: '示例：扩展 Select',
  },
  {
    key: 'prop-name',
    label: '使用 PropName',
  },
  {
    key: 'comprehensive',
    label: '示例：全面的自定义',
  },
];

export function UseControllableValuePage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='useControllableValue' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <SelectWithSuffix style={{ width: 120 }} /> : null}
      {current === 'prop-name' ? <SwitchWithSuffix /> : null}
      {current === 'comprehensive' ? <Comprehensive /> : null}
    </GeneralTab>
  );
}

interface SelectWithSuffixProps extends SelectProps {
  suffix?: React.ReactNode;
}

function SelectWithSuffix(props: SelectWithSuffixProps) {
  const { suffix } = props;
  const standardProps = pick(props, ['defaultValue', 'value', 'onChange']);
  const [innerValue, setInnerValue] = useControllableValue(standardProps);
  const restProps = omit(props, ['defaultValue', 'value', 'onChange', 'suffix']);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select value={innerValue} onChange={setInnerValue} {...restProps} />
      {suffix}
    </div>
  );
}

interface SwitchWithSuffixProps extends SwitchProps {
  suffix?: React.ReactNode;
}

function SwitchWithSuffix(props: SwitchWithSuffixProps) {
  const { suffix } = props;
  const standardProps = pick(props, ['defaultChecked', 'checked', 'onChange']);
  const [innerValue, setInnerValue] = useControllableValue(standardProps, { defaultValuePropName: 'defaultChecked', valuePropName: 'checked' });
  const restProps = omit(props, ['defaultChecked', 'checked', 'onChange', 'suffix']);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Switch checked={innerValue} onChange={setInnerValue} {...restProps} />
      {suffix}
    </div>
  );
}

function Comprehensive() {
  return (
    <>
      <Form initialValues={{ link: { protocol: 'https' } }}>
        <Form.Item name='link' label='链接'>
          <ProtocolInput
            options={[
              { label: 'http', value: 'http' },
              { label: 'https', value: 'https' },
            ]}
          />
        </Form.Item>
        <Button htmlType='submit' type='primary'>
          提交
        </Button>
      </Form>
    </>
  );
}

interface ProtocolInputValue {
  protocol: string;
  address: string;
}

interface ProtocolInputProps {
  value?: ProtocolInputValue;
  onChange?: (value: ProtocolInputValue) => void;
  options?: Required<SelectProps>['options'];
}

function ProtocolInput(props: ProtocolInputProps) {
  const { options } = props;
  const standardProps = pick(props, ['defaultValue', 'value', 'onChange']);
  // 为什么 innerValue 是 any
  // 因为没有匹配到 useControllableValue 的任意一个函数签名
  // 源码中 StandardProps 的定义 value onChange 必填 defaultValue 不是必填，但也必须存在，所以没有匹配上
  // 没有匹配上，就传 value 的类型给泛型
  // const [innerValue, setInnerValue] = useControllableValue(standardProps);
  const [innerValue, setInnerValue] = useControllableValue<ProtocolInputValue>(standardProps);
  const selectChange = useCallback<Required<SelectProps>['onChange']>((value) => {
    setInnerValue((prev) => ({ ...prev, protocol: value }));
  }, []);
  const inputChange = useCallback<Required<InputProps>['onChange']>((e) => {
    setInnerValue((prev) => ({ ...prev, address: e.target.value }));
  }, []);
  return (
    <Space.Compact>
      <Select value={innerValue?.protocol} onChange={selectChange} options={options} style={{ width: '100px' }} />
      <Input value={innerValue?.address} onChange={inputChange} />
    </Space.Compact>
  );
}
