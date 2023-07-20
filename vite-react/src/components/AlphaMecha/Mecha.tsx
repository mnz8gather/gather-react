import React, { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import AlphaModal from './Modal';

type AlphaModalProps = Parameters<typeof AlphaModal>[0];

interface AlphaMechaProps extends Omit<AlphaModalProps, 'visible' | 'open' | 'onCancel'> {
  render: (onClick: () => void) => React.ReactNode;
}

function AlphaMecha(props: AlphaMechaProps) {
  const { render, ...restProps } = props;

  const [openModal, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      {render?.(handleClick)}
      <AlphaModal
        {...restProps}
        open={openModal}
        onCancel={() => {
          setFalse();
        }}
      />
    </>
  );
}

export default AlphaMecha;
