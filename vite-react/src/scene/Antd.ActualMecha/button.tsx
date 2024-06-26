import { Button } from 'antd';
import { Mecha } from './mecha';
import type { ButtonProps } from 'antd';
import type { MechaProps } from './mecha';

interface ActualButtonProps extends Omit<ButtonProps, 'onClick'> {
  mechaProps: Omit<MechaProps, 'render'>;
}

export function ActualButton(props: ActualButtonProps) {
  const { mechaProps, ...restProps } = props;

  return (
    <Mecha
      render={(onClick) => {
        return <Button {...restProps} onClick={onClick} />;
      }}
      {...mechaProps}
    />
  );
}
