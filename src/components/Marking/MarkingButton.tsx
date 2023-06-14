import { useState } from 'react';
import { Button, Modal, Space, Skeleton } from 'antd';
import { useBoolean, useRequest } from 'ahooks';
import axios from 'axios';
import MarkContent from './Content';
import type { ButtonProps, ModalProps } from 'antd';

function MarkingButton(props: MarkingButtonProps) {
  const { id: person_id, afterSuccess, ...rest } = props;

  if (typeof person_id !== 'number') {
    return null;
  }

  const [openMark, { setTrue, setFalse }] = useBoolean(false);

  return (
    <>
      <Button
        {...rest}
        onClick={() => {
          setTrue();
        }}
      >
        打标
      </Button>
      <RequestWrapper person_id={person_id} afterSuccess={afterSuccess} open={openMark} setClose={setFalse} destroyOnClose />
    </>
  );
}

export default MarkingButton;

interface RequestWrapperProps extends Omit<MarkingModalProps, 'value'> {}

function RequestWrapper(props: RequestWrapperProps) {
  const { person_id, open, ...rest } = props;

  if (!open) {
    return null;
  }

  // here: request marked by person_id
  const { data: marks, loading } = useRequest<{ data: React.Key[] }, unknown[]>(() => axios('/mock/person-info/key-person/get-label-by-person-id'));

  return (
    <>
      {loading && <Skeleton />}
      {!loading && <MarkingModal value={marks?.data} person_id={person_id} open={open} {...rest} />}
    </>
  );
}

interface MarkingModalProps extends ModalProps {
  setClose?: () => void;
  value?: React.Key[];
  person_id?: number;
  afterSuccess?: () => void;
}

function MarkingModal(props: MarkingModalProps) {
  const { setClose, value, person_id, afterSuccess, open, destroyOnClose, ...rest } = props;

  if (destroyOnClose && !open) {
    return null;
  }

  const [mark, setMark] = useState<React.Key[] | undefined>(value);

  const handleFinish = () => {
    // here: person add label
    console.log('MarkingModal handleFinish', mark);
    // setClose?.();
    afterSuccess?.();
  };

  const footer = (
    <Space>
      <Button
        onClick={() => {
          setClose?.();
        }}
      >
        取消
      </Button>
      <Button type="primary" onClick={handleFinish}>
        确定
      </Button>
    </Space>
  );

  return (
    <Modal
      title={<span style={{ color: '#1C2329' }}>贴标签</span>}
      open={open}
      onCancel={() => {
        setClose?.();
      }}
      bodyStyle={{ padding: '0 20px', height: '500px', overflow: 'auto' }}
      width={800}
      footer={footer}
      closable={false}
      {...rest}
    >
      <MarkContent
        mode="editable"
        value={mark}
        onChange={(nu) => {
          setMark(nu);
        }}
      />
    </Modal>
  );
}

interface MarkingButtonProps extends Omit<ButtonProps, 'onClick' | 'id'> {
  id?: number;
  afterSuccess?: () => void;
}
