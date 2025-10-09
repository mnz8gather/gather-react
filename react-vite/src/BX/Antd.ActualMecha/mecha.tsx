import React, { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import { Window } from './window';
import type { FormProps, ModalProps, DrawerProps } from 'antd';
import type { ActualProps } from './actual';
import type { WindowProps, WindowActualOmitKey, WindowFormOmitKey, WindowDrawerOmitKey, WindowModalOmitKey } from './window';

export type MechaWindowOmitKey = 'onWindowClose' | 'formProps' | 'actualProps' | 'modalProps' | 'drawerProps';

export interface MechaProps {
  formProps?: Omit<FormProps, WindowFormOmitKey>;
  actualProps?: Omit<ActualProps, WindowActualOmitKey>;
  modalProps?: Omit<ModalProps, WindowModalOmitKey>;
  drawerProps?: Omit<DrawerProps, WindowDrawerOmitKey>;
  windowProps?: Omit<WindowProps, MechaWindowOmitKey>;
  render: (onClick: () => void) => React.ReactNode;
}

export function Mecha(props: MechaProps) {
  const { render, formProps, actualProps, drawerProps, modalProps, windowProps } = props;

  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      {render?.(handleClick)}
      <Window
        formProps={formProps}
        actualProps={{ ...actualProps, afterFinish: setFalse }}
        onWindowClose={setFalse}
        modalProps={{
          ...modalProps,
          open: openWindow,
        }}
        drawerProps={{
          ...drawerProps,
          open: openWindow,
        }}
        {...windowProps}
      />
    </>
  );
}

// 这里的结构为什么可以为 undefined
// 因为这里不是结构赋值
// 这里是扩展运算
// ...modalProps
