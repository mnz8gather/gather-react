import { App, Button, Input, Tooltip } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';
import { usePropsValue } from '@/hooks/usePropsValue';
import { useParentHover } from '@/hooks-fork/useParentHover';
import type { InputProps, ButtonProps, InputRef, ModalFuncProps } from 'antd';

const items = [
  {
    key: 'save',
    label: '带保存',
  },
  {
    key: 'confirm',
    label: '带确认',
  },
];

export function AntdInputPage() {
  const [current, setCurrent] = useState('save');
  return (
    <GeneralTab title='antd Input' items={items} value={current} onChange={setCurrent}>
      {current === 'save' ? <SaveInputSample /> : null}
      {current === 'confirm' ? <ConfirmInputSample /> : null}
    </GeneralTab>
  );
}

function SaveInputSample() {
  return (
    <>
      <SaveInput buttonChildren='保存' styles={{ input: { width: '240px' } }} />
    </>
  );
}

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

function SaveInput(props: SaveInputProps) {
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

function ConfirmInputSample() {
  const { message } = App.useApp();
  return (
    <>
      <div style={{ width: 200, height: 200, backgroundColor: 'floralwhite' }}>
        支持大小写字母和数字，长度不能超过100
        <ConfirmInput
          confirmProps={{
            title: 'sure',
            content: (v) => v,
            onOk(v, focus) {
              // 这里做操作
              if (v) {
                // 操作成功 reload 页面
                message.success('设置成功');
              } else {
                // 聚焦
                focus?.({
                  cursor: 'end',
                });
              }
            },
          }}
          validator={(v) => {
            if (v === undefined) {
              return true;
            }
            return /^[A-Za-z0-9]{0,100}$/.test(v);
          }}
          errorMessage='支持大小写字母和数字，长度不能超过100'
        />
      </div>
    </>
  );
}

type InputStatus = InputProps['status'];

type AntdInputFocus = InputRef['focus'];

interface ConfirmProps extends Omit<ModalFuncProps, 'content' | 'onOk'> {
  content?: (v?: string) => React.ReactNode;
  onOk?: (v?: string, focus?: AntdInputFocus) => void;
}

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

/**
 * 确认输入框
 */
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
      // console.log('onEnter');
    },
    onLeave: () => {
      // console.log('onLeave');
    },
    onChange: (isHover) => {
      // console.log('onChange', isHover);
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
