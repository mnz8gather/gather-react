import { Button, Modal, Space } from 'antd';
import { useBoolean } from 'ahooks';
import Icon, { InfoCircleFilled } from '@ant-design/icons';
import DeleteSvg from './svg-delete';
import type { ModalProps } from 'antd';

interface DeleteButtonProps<T> extends II {
  component?: React.ComponentType<React.HTMLProps<T>>;
}

function DeleteButton<T>(props: DeleteButtonProps<T>) {
  const { component, category_key, category_name, label_key, label_name, afterSuccess } = props;

  if (typeof category_key === undefined || typeof category_key === null) {
    return null;
  }

  const [openMark, { setTrue, setFalse }] = useBoolean(false);

  const ButtonComponent = component || default_button;

  return (
    <>
      <ButtonComponent
        onClick={() => {
          setTrue();
        }}
      />
      <DeleteModal
        category_key={category_key}
        category_name={category_name}
        label_key={label_key}
        label_name={label_name}
        open={openMark}
        setClose={setFalse}
        destroyOnClose
        afterSuccess={afterSuccess}
      />
    </>
  );
}

export default DeleteButton;

interface II {
  category_key: React.Key;
  category_name: string;
  label_key: React.Key;
  label_name: string;
  afterSuccess?: (label_key?: React.Key) => void;
}

export interface DeleteModalProps extends ModalProps, II {
  setClose?: () => void;
}

function DeleteModal(props: DeleteModalProps) {
  const { category_key, category_name, label_key, label_name, setClose, open, destroyOnClose, afterSuccess, ...rest } = props;

  if (destroyOnClose && !open) {
    return null;
  }

  const handleDelete = () => {
    // here: delete by label_key
    afterSuccess?.(label_key);
  };

  const content = (
    <div style={{ display: 'flex', alignItems: 'center', height: '80px' }}>
      <InfoCircleFilled style={{ color: '#faad14', fontSize: '22px', marginRight: '8px' }} />
      你确定删除 {label_name} 这个标签吗？
    </div>
  );

  const footer = (
    <Space>
      <Button
        onClick={() => {
          setClose?.();
        }}
      >
        取消
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleDelete();
        }}
      >
        确定
      </Button>
    </Space>
  );

  return (
    <Modal
      title={`${category_name}-删除`}
      open={open}
      onCancel={() => {
        setClose?.();
      }}
      width={660}
      footer={footer}
      {...rest}
    >
      {content}
    </Modal>
  );
}

type Icon = typeof Icon;

function default_button(props: Icon['defaultProps']) {
  return <Icon {...props} component={DeleteSvg} style={{ marginLeft: '16px' }} />;
}
