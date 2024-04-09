import { Modal } from 'antd';
import Alpha from './Alpha';
import type { ModalProps } from 'antd';

type AlphaType = typeof Alpha;
type AlphaProps = Parameters<AlphaType>[0];

interface AlphaModalProps extends ModalProps, AlphaProps {}

function AlphaModal(props: AlphaModalProps) {
  const { someCode, ...restProps } = props;

  return (
    <Modal {...restProps}>
      <Alpha someCode={someCode} />
    </Modal>
  );
}

export default AlphaModal;
