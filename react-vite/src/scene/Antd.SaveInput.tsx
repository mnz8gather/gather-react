import { useMemo } from 'react';
import { Input, Button } from 'antd';
import { usePropsValue } from '@/hooks/usePropsValue';
import type { InputProps, ButtonProps } from 'antd';

interface SaveInputProps {
  disabled?: boolean;
  classNames?: {
    input?: string;
    button?: string;
  };
  styles?: {
    input?: React.CSSProperties;
    button?: React.CSSProperties;
  };
  types?: {
    input?: InputProps['type'];
    /** @default link */
    button?: ButtonProps['type'];
  };
  buttonChildren?: ButtonProps['children'];
  value?: string;
  onChange?: (v?: string) => void;
  buttonClick?: ButtonProps['onClick'];
  loading?: boolean;
}

export function SaveInput(props: SaveInputProps) {
  const { disabled, classNames, styles, types, buttonChildren, value, onChange, buttonClick, loading } = props;

  const [innerValue, setInnerValue] = usePropsValue({
    defaultValue: undefined,
    onChange,
    value,
  });

  const buttonShow = useMemo(() => {
    if (disabled) {
      return false;
    }
    if (!disabled && !innerValue) {
      return false;
    }
    return true;
  }, [disabled, innerValue]);

  const inputDisabled = useMemo(() => {
    if (disabled) {
      return true;
    }
    if (!disabled && loading) {
      return true;
    }
    return false;
  }, [disabled, loading]);

  return (
    <>
      <Input
        disabled={inputDisabled}
        className={classNames?.input}
        style={styles?.input}
        type={types?.input}
        value={innerValue}
        onChange={(e) => {
          setInnerValue(e?.target?.value);
        }}
      />
      {buttonShow ? (
        <Button className={classNames?.button} style={styles?.button} type={types?.button ? types.button : 'link'} onClick={buttonClick} loading={loading}>
          {buttonChildren}
        </Button>
      ) : null}
    </>
  );
}
