```tsx
import React from 'react';

interface ChildWrapperProps<P> {
  children: React.ReactElement<P>;
}

function ChildWrapper<P>(props: ChildWrapperProps<P>) {
  const { children } = props;

  const child = React.Children.only(children);

  if (child.type === React.Fragment) {
    return null;
  }

  if (React.isValidElement(child)) {
    const cloneProps = {
      ...child.props,
      onClick: () => {
        console.log('first');
      },
    };
    const clone = React.cloneElement(child, cloneProps);
    return clone;
  }

  return child;
}

export default ChildWrapper;
```

```tsx
import React, { useCallback, useRef } from 'react';
import { Button, Space } from 'antd';
import { useBoolean } from 'ahooks';
import ActualWindow from './Window';
import { OperationEnum } from './interface';
import type { ActualComponentRef } from './Actual';
import type { ToTuple } from '@/types';

const titleMap = {
  [OperationEnum.AA]: 'AA 标题',
  [OperationEnum.BB]: 'BB 标题',
  [OperationEnum.CC]: 'CC 标题',
  [OperationEnum.DD]: 'DD 标题',
};

type ActualWindowProps = Parameters<typeof ActualWindow>[0];

// Drawer 的 footer 也被移除了
// type OmitUnion<Type> = Type extends ActualWindowProps ? Omit<Type, 'actualProps' | 'visible' | 'open' | 'onCancel' | 'onClose' | 'title' | 'footer'> : never;
// type WindowProps = OmitUnion<ActualWindowProps>;

// -------------------------------------------------------------------------
// to do this type
// | 'visible' | 'open' | 'onCancel' | 'onClose' | 'title' | 'footer'

type OmitUnion<Type, P, U extends string | number | symbol> = Type extends P ? Omit<Type, U> : never;

// type OmitUnion<Type> = Type extends ActualWindowProps ? Omit<Type, 'actualProps'> : never;
type WindowProps = OmitUnion<ActualWindowProps, ActualWindowProps, 'actualProps'>;
// -------------------------------------------------------------------------

type WindowPropsTuple = ToTuple<WindowProps>;
type ModalWindowProps = WindowPropsTuple[0];
type DrawerWindowProps = WindowPropsTuple[1];

type a = ActualWindowProps['actualProps'];
type b = WindowProps['actualProps'];

interface ExoticProps {
  actualProps: ActualWindowProps['actualProps'];
  windowProps: WindowProps;
}

interface ActualMechaProps extends ExoticProps {
  render: (onClick: () => void) => React.ReactNode;
}

function ActualMecha(props: ActualMechaProps) {
  const { render, actualProps, windowProps } = props;

  const actualModalProps = windowProps as ModalWindowProps;
  const actualDrawerProps = windowProps as DrawerWindowProps;

  const actualRef = useRef<ActualComponentRef>(null);
  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  const operationType = actualProps?.operationType;

  const title = operationType ? titleMap[operationType] : '';

  const footer = (
    <Space>
      <Button
        onClick={() => {
          setFalse();
        }}
      >
        取消
      </Button>
      <Button
        type='primary'
        onClick={() => {
          actualRef?.current?.submit?.();
        }}
      >
        确定
      </Button>
    </Space>
  );

  return (
    <>
      {render?.(handleClick)}
      <ActualWindow
        actualProps={{
          ref: actualRef,
          ...actualProps,
          afterSuccess() {
            actualProps?.afterSuccess?.();
            setFalse();
          },
        }}
        type={windowProps?.type}
        modalProps={{
          // 这里的结构为什么可以为 undefined
          ...actualModalProps?.modalProps,
          open: openWindow,
          onCancel: () => {
            setFalse();
          },
          footer,
          title,
        }}
        drawerProps={{
          ...actualDrawerProps?.drawerProps,
          open: openWindow,
          onClose: () => {
            setFalse();
          },
          title,
        }}
        footer={footer}
      />
    </>
  );
}

export default ActualMecha;

function b() {
  return <ActualMecha actualProps={{}} render={() => {}} windowProps={{ drawerProps: { onClose: () => {} } }} />;
}

```