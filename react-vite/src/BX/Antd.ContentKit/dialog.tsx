import { Modal } from 'antd';
import { Content } from './content';
import type { ModalProps } from 'antd';
import type { ContentProps } from './content';

export type CkDialogOmitKey = 'destroyOnClose';

interface CkDialogProps {
  contentProps?: ContentProps;
  modalProps?: Omit<ModalProps, CkDialogOmitKey>;
}

export function CkDialog(props: CkDialogProps) {
  const { modalProps, contentProps } = props;

  return (
    <Modal
      {...modalProps}
      onOk={(e) => {
        modalProps?.onOk?.(e);
      }}
      destroyOnClose
    >
      <Content {...contentProps} />
    </Modal>
  );
}
