import React, { useCallback, useRef } from 'react';
import { useBoolean } from 'ahooks';
import ActualWindow from './Window';
import type { ActualComponentRef } from './Actual';

type ActualWindowProps = Parameters<typeof ActualWindow>[0];

interface ActualMechaProps extends Omit<ActualWindowProps, 'submit' | 'cancel'> {
  render: (onClick: () => void) => React.ReactNode;
}

function ActualMecha(props: ActualMechaProps) {
  const { render, actualProps, windowType, drawerProps, modalProps } = props;

  const actualRef = useRef<ActualComponentRef>(null);
  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  const submit = useCallback(() => {
    actualRef?.current?.submit?.();
  }, []);

  return (
    <>
      {render?.(handleClick)}
      <ActualWindow
        windowType={windowType}
        actualProps={{
          ref: actualRef,
          ...actualProps,
          afterSuccess() {
            actualProps?.afterSuccess?.();
            setFalse();
          },
        }}
        modalProps={{
          // 这里的结构为什么可以为 undefined
          // 因为这里不是结构赋值
          // 这里是扩展运算
          ...modalProps,
          open: openWindow,
          onCancel: setFalse,
        }}
        drawerProps={{
          ...drawerProps,
          open: openWindow,
          onClose: setFalse,
        }}
        cancel={setFalse}
        submit={submit}
      />
    </>
  );
}

export default ActualMecha;
