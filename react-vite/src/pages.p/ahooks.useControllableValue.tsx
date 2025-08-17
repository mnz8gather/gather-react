import { useState } from 'react';
import { omit, pick } from 'lodash';
import { Select, Switch } from 'antd';
import { useControllableValue } from 'ahooks';
import { GeneralTab } from '@/shared/GeneralTab';
import type { SelectProps, SwitchProps } from 'antd';

const items = [
  {
    key: 'sample',
    label: '示例',
  },
  {
    key: 'prop-name',
    label: '使用 PropName',
  },
];

export function UseControllableValuePage() {
  const [current, setCurrent] = useState('sample');
  return (
    <GeneralTab title='useControllableValue' items={items} value={current} onChange={setCurrent}>
      {current === 'sample' ? <SelectWithSuffix style={{ width: 120 }} /> : null}
      {current === 'prop-name' ? <SwitchWithSuffix /> : null}
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
