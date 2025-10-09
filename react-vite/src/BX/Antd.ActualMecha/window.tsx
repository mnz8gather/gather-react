import { useRef } from 'react';
import { Drawer, Modal, Button, Space, Form } from 'antd';
import { ForwardActual } from './actual';
import { OperationEnum } from './interface';
import type { FormProps, ModalProps, DrawerProps } from 'antd';
import type { ActualProps, ActualRef, ActualFormOmitKey } from './actual';

export type WindowFormOmitKey = ActualFormOmitKey | 'form';
export type WindowActualOmitKey = 'formProps';
type ModalFooterRelevantKey = 'cancelButtonProps' | 'cancelText' | 'okButtonProps' | 'okText' | 'okType' | 'onCancel' | 'onOk';
export type WindowModalOmitKey = 'destroyOnClose' | 'footer' | ModalFooterRelevantKey;
type DrawerFooterRelevantKey = 'onClose';
export type WindowDrawerOmitKey = 'destroyOnClose' | 'footer' | DrawerFooterRelevantKey;

export interface WindowProps {
  formProps?: Omit<FormProps, WindowFormOmitKey>;
  actualProps?: Omit<ActualProps, WindowActualOmitKey>;
  modalProps?: Omit<ModalProps, WindowModalOmitKey>;
  drawerProps?: Omit<DrawerProps, WindowDrawerOmitKey>;
  windowType?: 'modal' | 'drawer';
  onWindowClose?: () => void;
}

export function Window(props: WindowProps) {
  const { actualProps, windowType, drawerProps, modalProps, onWindowClose } = props;

  const [form] = Form.useForm();
  const actualFormRef = useRef<ActualRef>(null);
  const actual = <ForwardActual {...actualProps} formProps={{ form }} ref={actualFormRef} />;

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

  const typeTemp = windowType ?? 'modal';

  if (typeTemp === 'modal') {
    return (
      <Modal width={1000} title={windowTitle} {...modalProps} destroyOnClose footer={windowFooter} onCancel={onWindowClose}>
        {actual}
      </Modal>
    );
  }

  if (typeTemp === 'drawer') {
    return (
      <Drawer width={1000} title={windowTitle} {...drawerProps} destroyOnClose footer={windowFooter} onClose={onWindowClose}>
        {actual}
        {/* 自定义 Drawer footer */}
        {/* <div style={{ textAlign: 'right', paddingTop: 24 }}>{windowFooter}</div> */}
      </Drawer>
    );
  }
}

const titleMap = {
  [OperationEnum.a]: 'AA 标题',
  [OperationEnum.b]: 'BB 标题',
  [OperationEnum.c]: 'CC 标题',
};
