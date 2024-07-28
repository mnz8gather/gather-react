import { Button, Input, Tooltip, App } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePropsValue } from '@/hooks/usePropsValue';
import { useParentHover } from '@/hooks/useParentHover';
import type { InputProps, InputRef, ModalFuncProps } from 'antd';

interface ConfirmInputProps {
  classNames?: {
    input?: string;
  };
  styles?: {
    input?: React.CSSProperties;
  };
  types?: {
    input?: InputProps['type'];
  };
  value?: string;
  onChange?: (v?: string) => void;
  validator?: (v?: string) => boolean;
  errorMessage?: string;
  confirmProps?: ConfirmProps;
}

type AntdInputFocus = InputRef['focus'];

interface ConfirmProps extends Omit<ModalFuncProps, 'content' | 'onOk'> {
  content?: (v?: string) => React.ReactNode;
  onOk?: (v?: string, focus?: AntdInputFocus) => void;
}

export function ConfirmInput(props: ConfirmInputProps) {
  const { modal } = App.useApp();
  const { classNames, styles, types, value, onChange, validator, errorMessage, confirmProps } = props;

  const [innerValue, setInnerValue] = usePropsValue({
    defaultValue: undefined,
    onChange,
    value,
  });

  const [errorTooltipOpen, setErrorTooltipOpen] = useState(false);
  const [inputStatus, setInputStatus] = useState<InputStatus>();
  const inputRef = useRef<InputRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHovering = useParentHover(wrapperRef, {
    onEnter: () => {
      console.log('onEnter');
    },
    onLeave: () => {
      console.log('onLeave');
    },
    onChange: (isHover) => {
      console.log('onChange', isHover);
    },
  });

  const [inputShow, setInputShow] = useState(false);
  const editShow = useMemo(() => {
    if (inputShow) {
      return false;
    }
    return isHovering;
  }, [isHovering, inputShow]);

  const showConfirm = useCallback(() => {
    if (innerValue === undefined || innerValue === '') {
      setInputShow(false);
      return;
    }
    if (inputStatus !== undefined) {
      inputRef.current?.focus?.({
        cursor: 'end',
      });
      return;
    }
    const content = confirmProps?.content;
    const onOk = confirmProps?.onOk;
    const onCancel = confirmProps?.onCancel;
    modal.confirm({
      ...confirmProps,
      content: content?.(innerValue),
      onOk() {
        onOk?.(innerValue, inputRef.current?.focus);
      },
      onCancel() {
        inputRef.current?.focus?.({
          cursor: 'end',
        });
        onCancel?.();
      },
    });
  }, [innerValue, inputStatus, confirmProps]);

  const openEdit = useCallback(() => {
    setInputShow(true);
  }, []);

  const closeEdit = useCallback(() => {
    setInnerValue(undefined);
  }, [setInnerValue]);

  useEffect(() => {
    if (inputShow) {
      inputRef.current?.focus?.({
        cursor: 'end',
      });
    }
  }, [inputShow]);

  useEffect(() => {
    if (validator && !validator?.(innerValue)) {
      setInputStatus('error');
      if (errorMessage) {
        setErrorTooltipOpen(true);
      }
    } else if (validator) {
      setInputStatus(undefined);
      if (errorMessage) {
        setErrorTooltipOpen(false);
      }
    }
  }, [errorMessage, validator, innerValue]);

  return (
    <div ref={wrapperRef} style={{ display: 'flex', alignItems: 'center' }}>
      {editShow ? (
        <Button type='link' onClick={openEdit}>
          <EditOutlined />
        </Button>
      ) : null}
      {inputShow ? (
        <Tooltip title={errorMessage} open={errorTooltipOpen}>
          <Input
            ref={inputRef}
            className={classNames?.input}
            style={styles?.input}
            type={types?.input}
            value={innerValue}
            status={inputStatus}
            onChange={(e) => {
              setInnerValue(e?.target?.value);
            }}
            onBlur={showConfirm}
            onPressEnter={() => {
              inputRef.current?.blur();
            }}
          />
        </Tooltip>
      ) : null}
      {inputShow ? (
        <div
          style={{
            flex: '0 0 20px',
            alignSelf: 'stretch',
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseDown={closeEdit}
        >
          <CloseOutlined style={{ color: '#e60a0a' }} />
        </div>
      ) : null}
    </div>
  );
}

type InputStatus = InputProps['status'];
