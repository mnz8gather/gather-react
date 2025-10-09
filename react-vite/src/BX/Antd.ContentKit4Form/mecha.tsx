import { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import { CkModal } from './modal';
import type { ModalProps, FormProps } from 'antd';
import type { FormValues } from './form';
import type { CkDialogOmitKey, CkFormOmitKey } from './modal';

// type onFinish = Parameters<NonNullable<FormProps<FormValues>["onFinish"]>>
type SetOpen = (value: boolean) => void;

type MechaFormOmitKey = 'onFinish' | CkFormOmitKey;
type MechaDialogOmitKey = 'open' | 'onCancel' | CkDialogOmitKey;

interface MechaProps {
  // render: <P extends any[]>(...args: P) => React.ReactNode; // 待考虑
  render: (onClick: () => void) => React.ReactNode;
  formProps?: Omit<FormProps, MechaFormOmitKey>;
  modalProps?: Omit<ModalProps, MechaDialogOmitKey>;
  onFinish?: (values: FormValues, setOpen: SetOpen) => void;
}

export function Mecha(props: MechaProps) {
  const { render, modalProps, formProps, onFinish } = props;
  const [openWindow, { setTrue, setFalse, set: setOpen }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      {render?.(handleClick)}
      <CkModal
        formProps={{
          ...formProps,
          onFinish: (values) => {
            onFinish?.(values, setOpen);
          },
        }}
        modalProps={{
          ...modalProps,
          open: openWindow,
          onCancel: () => {
            setFalse();
          },
        }}
      />
    </>
  );
}
