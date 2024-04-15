import { useRef } from 'react';
import { Modal } from 'antd';
import InternalForm from '@/paradigms/Antd.FormModalMecha/form';
import type { ModalProps } from 'antd';
import type { InternalFormProps, InternalFormRef } from '@/paradigms/Antd.FormModalMecha/form';

// type InternalFormType = typeof InternalForm;
// type InternalFormParameters = Parameters<InternalFormType>;
// type InternalFormPropsWithRef = InternalFormParameters[0];

// 再次修改，不传递 ref, 只在这里给 form ref
// 不能采用这种方式，是因为 ref 直接给到 InternalModal 而 InternalModal 并没有使用 forwardRef
// export interface InternalModalProps extends InternalFormPropsWithRef {
//   modalProps?: ModalProps;
// }

export interface InternalModalProps {
  modalProps?: Omit<ModalProps, 'destroyOnClose'>;
  internalFormProps?: InternalFormProps;
}

/**
 * Modal 相关的在这里处理
 *
 * 统一设置 destroyOnClose
 */
export default function InternalModal(props: InternalModalProps) {
  const { modalProps, internalFormProps } = props;
  const formRef = useRef<InternalFormRef>(null);

  return (
    <Modal
      {...modalProps}
      onOk={(e) => {
        formRef?.current?.submit?.();
        modalProps?.onOk?.(e);
      }}
      destroyOnClose
    >
      <InternalForm {...internalFormProps} ref={formRef} />
    </Modal>
  );
}
