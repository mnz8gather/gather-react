import { useCallback } from 'react';
import { useBoolean } from 'ahooks';
import InternalModal from '@/paradigms/Antd.FormModalMecha/modal';
import type { InternalModalProps } from '@/paradigms/Antd.FormModalMecha/modal';

/**
 * 这里包含 undefined 导致在使用 Omit 时，导致出现问题，详细看下面注释
 * 这里从 InternalModalProps 获取 modalProps, 而不是直接使用 antd ModalProps ModalProps原因，
 * 是在 modal.tsx 没有对 ModalProps 进行 Omit 处理，所以两个都可以，
 * 如果对 ModalProps 进行了处理，就要使用 InternalModalProps 中 modalProps, 这样应该是更好的
 */
type AllowModalProps = InternalModalProps['modalProps'];

interface MechaProps extends InternalModalProps {
  // 待考虑
  // render: <P extends any[]>(...args: P) => React.ReactNode;
  render: (onClick: () => void) => React.ReactNode;
  modalProps?: Omit<NonNullable<AllowModalProps>, 'open' | 'onCancel'>;
}

export default function Mecha(props: MechaProps) {
  const { render, modalProps, internalFormProps } = props;
  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      {render?.(handleClick)}
      <InternalModal
        internalFormProps={{
          ...internalFormProps,

          // 如果有需求，可以调整这里 afterFinish 逻辑
          afterFinish(values) {
            setFalse();
            // 这样处理，丰富 afterFinish 操作
            internalFormProps?.afterFinish?.(values);
          },
        }}
        modalProps={{
          ...modalProps,
          open: openWindow,
          onCancel: () => {
            setFalse();
          },
        }}
      />
    </>
  );
}

// 包含 undefined 直接使用 Omit 的情况
// type QWE = {}
// type QWE = Omit<AllowModalProps, 'open' | 'onCancel'>
// type ASD = {
//   children?: React.ReactNode;
//   className?: string | undefined;
//   style?: React.CSSProperties | undefined;
//   title?: React.ReactNode;
//   prefixCls?: string | undefined;
//   ... 33 more ...;
//   styles?: Omit<...> | undefined;
// }
// type ASD = Omit<NonNullable<AllowModalProps>, 'open' | 'onCancel'>
