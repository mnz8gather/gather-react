import React, { useCallback, useRef } from 'react';
import { Button, Space } from 'antd';
import { useBoolean } from 'ahooks';
import ActualWindow from './Window';
import { OperationEnum } from './interface';
import type { ActualComponentRef } from './Actual';

const titleMap = {
  [OperationEnum.AA]: 'AA 标题',
  [OperationEnum.BB]: 'BB 标题',
  [OperationEnum.CC]: 'CC 标题',
  [OperationEnum.DD]: 'DD 标题',
};

type ActualWindowProps = Parameters<typeof ActualWindow>[0];

// Drawer 的 footer 也被移除了
type OmitUnion<Type> = Type extends ActualWindowProps ? Omit<Type, 'actualProps' | 'visible' | 'open' | 'onCancel' | 'onClose' | 'title' | 'footer'> : never;
type WindowProps = OmitUnion<ActualWindowProps>;
type WindowPropsTuple = ToTuple<WindowProps>;
type ModalWindowProps = WindowPropsTuple[0];
type DrawerWindowProps = WindowPropsTuple[1];

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

type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

type ToTupleRec<Union, Rslt extends any[]> = SpliceOne<Union> extends never
  ? [ExtractOne<Union>, ...Rslt]
  : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

type ToTuple<Union> = ToTupleRec<Union, []>;
