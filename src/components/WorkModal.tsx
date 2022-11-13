import { Modal, Input } from 'antd';
import { useSafeState } from 'ahooks';
import type { ModalProps } from 'antd';
import type { InputHTMLAttributes } from 'react';

const WorkMoadl = (props: ModalProps & { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { setOpen } = props;
  const [inputValue, setInputValue] = useSafeState<InputHTMLAttributes<HTMLInputElement>['value']>();

  const content = (
    <Input
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );

  return (
    <Modal
      {...props}
      destroyOnClose
      onCancel={() => {
        setOpen(false);
      }}
      onOk={() => {
        setOpen(false);
      }}
    >
      {content}
    </Modal>
  );
};

export default WorkMoadl;
