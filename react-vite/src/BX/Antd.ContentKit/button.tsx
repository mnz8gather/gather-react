import { Button } from 'antd';
import { Mecha } from './mecha';
import type { ButtonProps, ModalProps } from 'antd';
import type { ContentProps } from './content';
import type { MechaOmitKey } from './mecha';

interface CkButtonProps extends Omit<ButtonProps, 'onClick'> {
  contentProps?: ContentProps;
  modalProps?: Omit<ModalProps, MechaOmitKey>;
}

export function CkButton(props: CkButtonProps) {
  const { contentProps, modalProps, ...restProps } = props;

  return (
    <Mecha
      render={(onClick) => {
        return <Button {...restProps} onClick={onClick} />;
      }}
      contentProps={contentProps}
      modalProps={modalProps}
    />
  );
}
