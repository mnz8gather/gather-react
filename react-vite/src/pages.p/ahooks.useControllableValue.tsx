import { Select, Switch } from 'antd';
import { omit, pick } from 'lodash';
import { useControllableValue } from 'ahooks';
import { GeneralContainer } from '@/shared/GeneralContainer';
import type { SelectProps, SwitchProps } from 'antd';

export function UseControllableValuePage() {
  return (
    <GeneralContainer title='useControllableValue sample' bodyStyle={{ overflow: 'auto', display: 'flex', gap: '8px' }}>
      <SelectWithSuffix />
      <SwitchWithSuffix />
    </GeneralContainer>
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
