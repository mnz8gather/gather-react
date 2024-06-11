import React, { useCallback } from 'react';
import { Button, Space, Modal } from 'antd';
import { useBoolean } from 'ahooks';
import type { ModalProps } from 'antd';

interface UploadModalProps extends ModalProps {
  render: (onClick: () => void) => React.ReactNode;
}

/**
 * todo
 */
function UploadModal(props: UploadModalProps) {
  const { render, ...restProps } = props;

  const [openWindow, { setTrue, setFalse }] = useBoolean(false);

  const handleClick = useCallback(() => {
    setTrue();
  }, [setTrue]);

  const footer = (
    <Space>
      <Button
        onClick={() => {
          setFalse();
        }}
      >
        取消
      </Button>
      <Button type='primary' onClick={() => {}}>
        确定
      </Button>
    </Space>
  );

  return (
    <>
      {render?.(handleClick)}
      <Modal {...restProps} open={openWindow} footer={footer}></Modal>
    </>
  );
}

export { UploadModal };
