import { useRef } from 'react';
import { Drawer, Modal, Button, Space, Form } from 'antd';
import { ForwardActual } from './actual';
import { OperationEnum } from './interface';
import type { ModalProps, DrawerProps } from 'antd';
import type { ActualProps, ActualRef } from './actual';

export type ActualFormOmitKey = 'form';
export type ModalOmitKey = 'destroyOnClose' | 'footer' | 'onOk' | 'onCancel';
export type DrawerOmitKey = 'destroyOnClose' | 'footer' | 'onClose';

export interface WindowProps {
  actualProps: Omit<ActualProps, ActualFormOmitKey>;
  windowType: 'modal' | 'drawer';
  /**
   * footer 已经移除了 onOk 也移除吧
   * 虽然移除了 footer 但与 footer 相关的一些属性没有移除, okText 等
   */
  modalProps?: Omit<ModalProps, ModalOmitKey>;
  drawerProps?: Omit<DrawerProps, DrawerOmitKey>;
  onWindowClose?: () => void;
}

export function Window(props: WindowProps) {
  const { actualProps, windowType, drawerProps, modalProps, onWindowClose } = props;

  const [form] = Form.useForm();
  const actualFormRef = useRef<ActualRef>(null);
  const actual = <ForwardActual {...actualProps} ref={actualFormRef} form={form} />;

  const operationType = actualProps?.operationType;
  const windowTitle = operationType ? titleMap[operationType] : '';

  const windowFooter = (
    <Space>
      <Button onClick={onWindowClose}>取消</Button>
      <Button
        type='primary'
        onClick={() => {
          form.submit();
        }}
      >
        确定
      </Button>
    </Space>
  );

  if (windowType === 'modal') {
    return (
      <Modal width={1000} title={windowTitle} {...modalProps} destroyOnClose footer={windowFooter} onCancel={onWindowClose}>
        {actual}
      </Modal>
    );
  }

  if (windowType === 'drawer') {
    return (
      <Drawer width={1000} title={windowTitle} {...drawerProps} destroyOnClose footer={windowFooter} onClose={onWindowClose}>
        {actual}
        {/* 自定义 Drawer footer */}
        {/* <div style={{ textAlign: 'right', paddingTop: 24 }}>{windowFooter}</div> */}
      </Drawer>
    );
  }

  return <></>;
}

const titleMap = {
  [OperationEnum.a]: 'AA 标题',
  [OperationEnum.b]: 'BB 标题',
  [OperationEnum.c]: 'CC 标题',
};
