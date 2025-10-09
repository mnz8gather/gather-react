import { Button } from 'antd';
import { Mecha } from './mecha';
import type { ButtonProps, FormProps, ModalProps, DrawerProps } from 'antd';
import type { ActualProps } from './actual';
import type { WindowProps, WindowActualOmitKey, WindowFormOmitKey, WindowDrawerOmitKey, WindowModalOmitKey } from './window';
import type { MechaWindowOmitKey } from './mecha';

interface ActualButtonProps extends Omit<ButtonProps, 'onClick'> {
  formProps?: Omit<FormProps, WindowFormOmitKey>;
  actualProps?: Omit<ActualProps, WindowActualOmitKey>;
  modalProps?: Omit<ModalProps, WindowModalOmitKey>;
  drawerProps?: Omit<DrawerProps, WindowDrawerOmitKey>;
  windowProps?: Omit<WindowProps, MechaWindowOmitKey>;
}

export function ActualButton(props: ActualButtonProps) {
  const { formProps, actualProps, modalProps, drawerProps, windowProps, ...restProps } = props;

  return (
    <Mecha
      render={(onClick) => {
        return <Button {...restProps} onClick={onClick} />;
      }}
      actualProps={actualProps}
      drawerProps={drawerProps}
      formProps={formProps}
      modalProps={modalProps}
      windowProps={windowProps}
    />
  );
}
