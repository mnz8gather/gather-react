import { Button, Modal, Space, Skeleton } from 'antd';
import { useBoolean, useRequest, useSafeState } from 'ahooks';
import MarkNormal from './Normal';
import MarkEditable from './Editable';
import { video_label_detail } from '@/services/videoInfo';
import type { ButtonProps, ModalProps } from 'antd';

interface MarkingButtonProps extends Omit<ButtonProps, 'onClick' | 'id'> {
  id?: number;
  afterSuccess?: () => void;
  modalProps?: RequestWrapperProps;
}

function MarkingButton(props: MarkingButtonProps) {
  const { id: person_id, afterSuccess, modalProps, ...rest } = props;

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
      <RequestWrapper person_id={person_id} afterSuccess={afterSuccess} open={openMark} setClose={setFalse} destroyOnClose {...modalProps} />
    </>
  );
}

export default MarkingButton;

type RequestWrapperProps = Omit<MarkingModalProps, 'value'>;

function RequestWrapper(props: RequestWrapperProps) {
  const { person_id, open, ...rest } = props;

  if (!open || typeof person_id !== 'number') {
    return null;
  }

  // here: request marked by person_id
  const { data: marks, loading } = useRequest(() => video_label_detail(String(person_id)));

  return (
    <>
      {loading && <Skeleton />}
      {!loading && <MarkingModal value={marks?.result} person_id={person_id} open={open} {...rest} />}
    </>
  );
}

interface MarkingModalProps extends ModalProps {
  value?: React.Key[];
  person_id?: number;
  setClose?: () => void;
  afterSuccess?: () => void;
  editAccess?: boolean;
}

function MarkingModal(props: MarkingModalProps) {
  const { setClose, value, person_id, afterSuccess, open, destroyOnClose, editAccess, ...rest } = props;

  if (destroyOnClose && !open) {
    return null;
  }

  const [mark, setMark] = useSafeState<React.Key[] | undefined>(value);

  const handleFinish = () => {
    // here: person add label
    console.log('MarkingModal handleFinish', mark, person_id);
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
      <Button type='primary' onClick={handleFinish}>
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
      styles={{ body: { padding: '0 20px', height: '500px', overflow: 'auto' } }}
      width={800}
      footer={footer}
      closable={false}
      {...rest}
    >
      {editAccess && (
        <MarkEditable
          value={mark}
          onChange={(nu) => {
            setMark(nu);
          }}
        />
      )}
      {!editAccess && (
        <MarkNormal
          value={mark}
          onChange={(nu) => {
            setMark(nu);
          }}
        />
      )}
    </Modal>
  );
}
