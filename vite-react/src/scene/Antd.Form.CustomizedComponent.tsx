import { useCallback } from 'react';
import { Select, InputNumber } from 'antd';
import { useSafeState } from 'ahooks';

interface TimeInputProps {
  value?: TimeInputValue;
  onChange?: (value: TimeInputValue) => void;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
}

/**
 * 自定义可以给 Form 使用的组件
 *
 * 支持受控和非受控，两种模式的状态没有同步操作。
 *
 * value 等于 undefined 判断为受控模式，那怕传递过来的就是 undefined。
 *
 * 使用值时，value 优先，然后是内部的 state，最后是默认值。
 */
export default function TimeInput(props: TimeInputProps) {
  const { value, onChange, inputStyle, selectStyle } = props;

  const triggerChange = useCallback(
    (changedValue: TimeInputValue) => {
      onChange?.(changedValue);
    },
    [onChange],
  );

  const [dataSource, setDataSource] = useSafeState<TimeInputValue>({
    timeNumber: 30,
    timeUnit: 'DAY',
  });

  const handleNumber = useCallback(
    (nubmerValue: number | null) => {
      let newData: TimeInputValue;
      function produce(source: TimeInputValue): TimeInputValue {
        return { ...source, timeNumber: nubmerValue ?? 0 };
      }
      if (value === undefined) {
        // 非受控情况
        newData = produce(dataSource);
        setDataSource(newData);
      } else {
        // 受控情况
        newData = produce(value);
      }
      triggerChange(newData);
    },
    [value, triggerChange, dataSource, setDataSource],
  );

  const handleUnit = useCallback(
    (unitValue: string) => {
      let newData: TimeInputValue;
      function produce(source: TimeInputValue): TimeInputValue {
        return { timeNumber: Math.min(source?.timeNumber ?? MAX_VALUE[unitValue], MAX_VALUE[unitValue]), timeUnit: unitValue };
      }
      if (value === undefined) {
        newData = produce(dataSource);
        setDataSource(newData);
      } else {
        newData = produce(value);
      }
      triggerChange(newData);
    },
    [value, triggerChange, dataSource, setDataSource],
  );

  return (
    <div>
      <InputNumber
        min={1}
        max={MAX_VALUE[value?.timeUnit ?? dataSource?.timeUnit ?? 'DAYS']}
        value={value !== undefined ? value?.timeNumber : dataSource?.timeNumber}
        onChange={handleNumber}
        style={inputStyle}
      />
      <Select options={unitOptions} value={value !== undefined ? value?.timeUnit : dataSource?.timeUnit} onChange={handleUnit} style={selectStyle} />
    </div>
  );
}

export interface TimeInputValue {
  timeNumber?: number;
  timeUnit?: string;
}

const unitOptions = [
  {
    label: '分',
    value: 'MINUTE',
  },
  {
    label: '时',
    value: 'HOUR',
  },
  {
    label: '天',
    value: 'DAY',
  },
];

const MAX_VALUE: Record<string, number> = {
  DAY: 365,
  HOUR: 365 * 24,
  MINUTE: 365 * 24 * 60,
};
