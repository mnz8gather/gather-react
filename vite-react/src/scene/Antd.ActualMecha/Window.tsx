import { Drawer, Modal, Button, Space } from 'antd';
import Actual from './Actual';
import { OperationEnum } from './interface';
import type { ModalProps, DrawerProps } from 'antd';

interface ActualWindowProps {
  actualProps: ActualProps;
  windowType: 'modal' | 'drawer';
  // footer 已经移除了 onOk 也移除吧
  // 虽然移除了 footer 但与 footer 相关的一些属性没有移除, okText 等
  modalProps?: Omit<ModalProps, 'destroyOnClose' | 'footer' | 'onOk'>;
  drawerProps?: Omit<DrawerProps, 'destroyOnClose' | 'footer'>;
  submit?: () => void;
  cancel?: () => void;
}

function ActualWindow(props: ActualWindowProps) {
  const { actualProps, windowType, drawerProps, modalProps, submit, cancel } = props;

  const actual = <Actual {...actualProps} />;

  const operationType = actualProps?.operationType;
  const windowTitle = operationType ? titleMap[operationType] : '';

  const windowFooter = (
    <Space>
      <Button onClick={cancel}>取消</Button>
      <Button type='primary' onClick={submit}>
        确定
      </Button>
    </Space>
  );

  if (windowType === 'modal') {
    return (
      <Modal width={1000} title={windowTitle} {...modalProps} destroyOnClose footer={windowFooter}>
        {actual}
      </Modal>
    );
  }

  if (windowType === 'drawer') {
    return (
      <Drawer width={1000} title={windowTitle} {...drawerProps} destroyOnClose>
        {actual}
        <div style={{ textAlign: 'right', paddingTop: 24 }}>{windowFooter}</div>
      </Drawer>
    );
  }

  return <></>;
}

export default ActualWindow;

type ActualType = typeof Actual;
type ActualProps = Parameters<ActualType>[0];

const titleMap = {
  [OperationEnum.a]: 'AA 标题',
  [OperationEnum.b]: 'BB 标题',
  [OperationEnum.c]: 'CC 标题',
};
