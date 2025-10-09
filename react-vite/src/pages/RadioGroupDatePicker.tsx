import dayjs from 'dayjs';
import { pick } from 'lodash';
import { useCallback } from 'react';
import { DatePicker, Radio, Typography } from 'antd';
import { useControllableValue } from 'ahooks';
import { GeneralContainer } from '@/shared/GeneralContainer';
import type { Dayjs } from 'dayjs';
import type { CheckboxOptionType, DatePickerProps, RadioGroupProps } from 'antd';

type Picker = Exclude<DatePickerProps['picker'], undefined | 'time'>;

interface PickerOptionType extends CheckboxOptionType {
  value: Picker;
}

interface RadioGroupDatePickerValue {
  picker?: Picker;
  moment?: Dayjs | null;
}

interface RadioGroupDatePickerProps
  extends Pick<RadioGroupProps, 'optionType' | 'buttonStyle'>,
    Pick<DatePickerProps, 'disabledDate' | 'getPopupContainer' | 'placement'> {
  defaultValue?: RadioGroupDatePickerValue;
  options?: PickerOptionType[];
  value?: RadioGroupDatePickerValue;
  onChange?: (value: RadioGroupDatePickerValue, dateString?: string) => void;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  radioGroupSize?: Required<RadioGroupProps>['size'];
  /** 父级 flex 后，单独设置是不生效的 */
  datePickerSize?: Required<DatePickerProps>['size'];
}

function RadioGroupDatePicker(props: RadioGroupDatePickerProps) {
  const {
    options,
    optionType = 'button',
    buttonStyle = 'solid',
    style,
    className,
    disabled,
    disabledDate,
    radioGroupSize,
    datePickerSize,
    getPopupContainer,
    placement,
  } = props;
  const standardProps = pick(props, ['defaultValue', 'value', 'onChange']);

  const [innerValue, setInnerValue] = useControllableValue<RadioGroupDatePickerValue>(standardProps, {
    defaultValue: {
      picker: 'week',
      moment: dayjs(),
    },
  });

  const handleRadioGroupChange = useCallback<Required<RadioGroupProps>['onChange']>((e) => {
    setInnerValue((prev) => {
      return { ...prev, picker: e.target.value };
    });
  }, []);

  const handleDatePickerChange = useCallback<Required<DatePickerProps>['onChange']>((value, dateString) => {
    setInnerValue((prev) => {
      return { ...prev, moment: value };
    }, dateString);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '8px', ...style }} className={className}>
      <Radio.Group
        value={innerValue?.picker}
        options={options ?? defaultOptions}
        optionType={optionType}
        buttonStyle={buttonStyle}
        onChange={handleRadioGroupChange}
        disabled={disabled}
        size={radioGroupSize}
      />
      <DatePicker
        picker={innerValue?.picker}
        value={innerValue?.moment}
        onChange={handleDatePickerChange}
        disabled={disabled}
        disabledDate={disabledDate}
        size={datePickerSize}
        getPopupContainer={getPopupContainer}
        placement={placement}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Text type='secondary'>
          {innerValue?.moment && innerValue?.picker ? innerValue?.moment?.startOf(innerValue?.picker).format('YYYY-MM-DD') : '--'}
        </Typography.Text>
        <Typography.Text type='secondary'>至</Typography.Text>
        <Typography.Text type='secondary'>
          {innerValue?.moment && innerValue?.picker ? innerValue?.moment?.endOf(innerValue?.picker).format('YYYY-MM-DD') : '--'}
        </Typography.Text>
      </div>
    </div>
  );
}

const defaultOptions: PickerOptionType[] = [
  {
    label: '周',
    value: 'week',
  },
  {
    label: '月',
    value: 'month',
  },
  {
    label: '季度',
    value: 'quarter',
  },
];

export function RadioGroupDatePickerPage() {
  return (
    <GeneralContainer title='RadioGroup and DatePicker'>
      <RadioGroupDatePicker />
    </GeneralContainer>
  );
}
