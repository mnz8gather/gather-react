import { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import { CkDialog } from './dialog';
import type { ModalProps } from 'antd';
import type { ContentProps } from './content';
import type { CkDialogOmitKey } from './dialog';

export type MechaOmitKey = 'open' | 'onCancel' | CkDialogOmitKey;

interface MechaProps {
  render: (onClick: () => void) => React.ReactNode;
  contentProps?: ContentProps;
  modalProps?: Omit<ModalProps, MechaOmitKey>;
}

export function Mecha(props: MechaProps) {
  const { render, modalProps, contentProps } = props;
  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      {render?.(handleClick)}
      <CkDialog
        contentProps={contentProps}
        modalProps={{
          ...modalProps,
          open: openWindow,
          onOk: () => {
            setFalse();
          },
          onCancel: () => {
            setFalse();
          },
        }}
      />
    </>
  );
}
