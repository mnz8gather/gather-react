import { Drawer, Modal } from 'antd';
import Actual from './Actual';
import type { ModalProps, DrawerProps } from 'antd';

type ActualType = typeof Actual;

interface ActualProps {
  actualProps: Parameters<ActualType>[0];
}

interface ActualModalProps extends ActualProps {
  type: 'modal';
  modalProps?: ModalProps;
}

interface ActualDrawerProps extends ActualProps {
  type: 'drawer';
  drawerProps?: DrawerProps;
  footer?: React.ReactNode;
}

type ActualWindowProps = ActualModalProps | ActualDrawerProps;

function ActualWindow(props: ActualWindowProps) {
  const { actualProps, type, ...restProps } = props;

  const actualModalProps = restProps as Omit<Omit<ActualModalProps, 'destroyOnClose' | 'width'>, 'actualProps' | 'type'>;
  const actualDrawerProps = restProps as Omit<Omit<ActualDrawerProps, 'destroyOnClose' | 'width'>, 'actualProps' | 'type'>;

  return type === 'drawer' ? (
    <Drawer {...actualDrawerProps?.drawerProps} destroyOnClose width={1000}>
      <Actual {...actualProps} />
      <div style={{ textAlign: 'right', paddingTop: 24 }}>{actualDrawerProps?.footer}</div>
    </Drawer>
  ) : type === 'modal' ? (
    <Modal {...actualModalProps?.modalProps} destroyOnClose width={1000}>
      <Actual {...actualProps} />
    </Modal>
  ) : (
    <></>
  );
}

export default ActualWindow;
