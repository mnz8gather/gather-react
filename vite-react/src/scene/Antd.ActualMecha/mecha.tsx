import React, { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import { Window } from './window';
import type { WindowProps } from './window';

export interface MechaProps extends Omit<WindowProps, 'onWindowClose'> {
  render: (onClick: () => void) => React.ReactNode;
}

/**
 * @todo 语义化
 */
export function Mecha(props: MechaProps) {
  const { render, actualProps, windowType, drawerProps, modalProps } = props;

  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      {render?.(handleClick)}
      <Window
        windowType={windowType}
        onWindowClose={setFalse}
        actualProps={{ ...actualProps, afterFinish: setFalse }}
        modalProps={{
          ...modalProps,
          open: openWindow,
        }}
        drawerProps={{
          ...drawerProps,
          open: openWindow,
        }}
      />
    </>
  );
}

// 这里的结构为什么可以为 undefined
// 因为这里不是结构赋值
// 这里是扩展运算
// ...modalProps
