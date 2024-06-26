import { useRef } from 'react';
import { Modal, Form } from 'antd';
import { ForwardCkForm } from './form';
import type { ModalProps, FormProps } from 'antd';
import type { CkFormRef, FormValues } from './form';

// type InternalFormType = typeof InternalForm;
// type InternalFormParameters = Parameters<InternalFormType>;
// type InternalFormPropsWithRef = InternalFormParameters[0];

// 再次修改，不传递 ref, 只在这里给 form ref
// 不能采用这种方式，是因为 ref 直接给到 CkModal 而 CkModal 并没有使用 forwardRef
// export interface CkModalProps extends InternalFormPropsWithRef {
//   modalProps?: ModalProps;
// }

export type CkFormOmitKey = 'form';

export type CkDialogOmitKey = 'destroyOnClose';

export interface CkModalProps {
  modalProps?: Omit<ModalProps, CkDialogOmitKey>;
  formProps?: Omit<FormProps<FormValues>, CkFormOmitKey>;
}

/**
 * Modal 相关的在这里处理
 *
 * 统一设置 destroyOnClose
 */
export function CkModal(props: CkModalProps) {
  const { modalProps, formProps } = props;
  const [form] = Form.useForm<FormValues>();
  const ckFormRef = useRef<CkFormRef>(null);

  return (
    <Modal
      {...modalProps}
      onOk={(e) => {
        form?.submit?.();
        modalProps?.onOk?.(e);
      }}
      destroyOnClose
    >
      <ForwardCkForm {...formProps} ref={ckFormRef} form={form} />
    </Modal>
  );
}
