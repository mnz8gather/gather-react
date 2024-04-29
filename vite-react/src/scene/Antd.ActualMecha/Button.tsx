import { Button } from 'antd';
import ActualMecha from './Mecha';
import type { ButtonProps } from 'antd';

type ActualMechaProps = Parameters<typeof ActualMecha>[0];

interface ActualButtonProps extends Omit<ButtonProps, 'onClick'> {
  mechaProps: Omit<ActualMechaProps, 'render'>;
}

function ActualButton(props: ActualButtonProps) {
  const { mechaProps, ...restProps } = props;

  return (
    <ActualMecha
      render={(onClick) => {
        return <Button {...restProps} onClick={onClick} />;
      }}
      {...mechaProps}
    />
  );
}

export default ActualButton;
