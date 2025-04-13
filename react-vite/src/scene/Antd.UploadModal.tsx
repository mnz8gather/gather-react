import React, { useCallback, useState } from 'react';
import { Button, Space, Modal, Upload, message, Form, Input } from 'antd';
import { useBoolean } from 'ahooks';
import { DisplayRow } from '@/share/DisplayRow';
import { upload_file } from '@/services/scene';
import type { ModalProps, UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';

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

function UploadButton() {
  const [modalForm] = Form.useForm();
  const [file, setFile] = useState<UploadFile>();
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <>
      <Upload
        showUploadList={false}
        maxCount={1}
        accept='.txt'
        beforeUpload={(newfile) => {
          const name = newfile.name;
          if (name.endsWith('.txt')) {
            modalForm.setFieldsValue({ fileTitle: name });
            setFile(newfile);
            setUploadOpen(true);
          } else {
            setFile(undefined);
            message.error('请选择 .txt 文件');
          }
          return false;
        }}
      >
        <Button type='primary'>上传文件</Button>
      </Upload>
      <Modal
        open={uploadOpen}
        width={800}
        title='上传文件'
        destroyOnClose={true}
        onCancel={() => {
          if (!uploadOpen) {
            setFile(undefined);
          }

          setUploadOpen(false);
        }}
        onOk={() => {
          modalForm.submit();
        }}
      >
        <Form
          onFinish={async (formData: Record<string, any>) => {
            const bodyContent = new FormData();
            for (const [key, value] of Object.entries(formData)) {
              bodyContent.append(key, value);
            }
            bodyContent.append('file', file as RcFile);
            const res = await upload_file(bodyContent);
            if (res) {
              message.success('上传成功');
              // refresh();
            }
            setUploadOpen(false);
            setFile(undefined);
          }}
          form={modalForm}
        >
          <DisplayRow label='文件名'>{file?.name}</DisplayRow>
          <DisplayRow label='文件大小'>{file?.size ? byte2String(file?.size) : file?.size}</DisplayRow>
          <Form.Item name='description' label='描述'>
            <Input.TextArea maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
