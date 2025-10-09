import { Button } from 'antd';
import AlphaMecha from './Mecha';
import type { ButtonProps } from 'antd';

type AlphaMechaProps = Parameters<typeof AlphaMecha>[0];

interface AlphaButtonProps extends Omit<ButtonProps, 'onClick'> {
  modalProps?: Omit<AlphaMechaProps, 'render'>;
}

function AlphaButton(props: AlphaButtonProps) {
  const { modalProps, ...restProps } = props;

  return (
    <AlphaMecha
      {...modalProps}
      render={(onClick) => {
        return <Button {...restProps} onClick={onClick} />;
      }}
    />
  );
}

export default AlphaButton;
