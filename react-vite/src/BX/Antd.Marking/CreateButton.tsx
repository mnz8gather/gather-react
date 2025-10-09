import { Button, Modal, Form, Space, Input, Tag } from 'antd';
import { useBoolean } from 'ahooks';
import type { ModalProps, TagProps } from 'antd';

interface CreateButtonProps<T> extends CreateModalI {
  component?: React.ComponentType<React.HTMLProps<T>>;
}

function CreateButton<T>(props: CreateButtonProps<T>) {
  const { component, category_key, category_name, afterSuccess } = props;

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
      <CreateModal category_key={category_key} category_name={category_name} open={openMark} setClose={setFalse} destroyOnClose afterSuccess={afterSuccess} />
    </>
  );
}

export default CreateButton;

interface CreateModalI {
  category_key: React.Key;
  category_name: string;
  afterSuccess?: () => void;
}

export interface CreateModalProps extends ModalProps, CreateModalI {
  setClose?: () => void;
}

function CreateModal(props: CreateModalProps) {
  const { category_key, category_name, setClose, open, destroyOnClose, afterSuccess, ...rest } = props;

  if (destroyOnClose && !open) {
    return null;
  }

  const [form] = Form.useForm();

  const handleFinish = (values: unknown) => {
    // here: add label
    console.debug('handleFinish afterSuccess', values, category_key);
    afterSuccess?.();
  };

  const content = (
    <Form form={form} onFinish={handleFinish} labelCol={{ style: { width: 100 } }}>
      <Form.Item name='label_name' label='标签名称' rules={[{ required: true, message: '请填写标签名称' }]}>
        <Input allowClear placeholder='请填写标签名称' />
      </Form.Item>
      <Form.Item name='remark' label='备注' rules={[{ required: true, message: '请填写备注' }]}>
        <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder='请填写备注' />
      </Form.Item>
    </Form>
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
        type='primary'
        onClick={() => {
          form.submit();
        }}
      >
        确定
      </Button>
    </Space>
  );

  return (
    <Modal
      title={`${category_name}-新增`}
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

function default_button(props: TagProps) {
  return (
    <Tag
      {...props}
      style={{
        backgroundColor: '#FFFFFF',
        color: '#3B86FF',
        border: '1px dashed #3B86FF',
        borderRadius: '42px',
        padding: '2px 16px',
        height: '26px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      + 新增标签
    </Tag>
  );
}
