import { Button } from 'antd';
import ActualMecha from './Mecha';
import type { ButtonProps } from 'antd';

type ActualMechaProps = Parameters<typeof ActualMecha>[0];

interface ActualButtonProps extends Omit<ButtonProps, 'onClick'> {
  actualProps: ActualMechaProps['actualProps'];
  windowProps: ActualMechaProps['windowProps'];
}

function ActualButton(props: ActualButtonProps) {
  const { actualProps, windowProps, ...restProps } = props;

  return (
    <ActualMecha
      render={(onClick) => {
        return <Button {...restProps} onClick={onClick} />;
      }}
      actualProps={actualProps}
      windowProps={windowProps}
    />
  );
}

export default ActualButton;
