import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, message, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useSafeState } from 'ahooks';
import { OperationEnum } from './interface';
import type { UploadFile } from 'antd/lib/upload/interface';

interface ActualProps {
  afterSuccess?: () => void;
  operationType: OperationType;
  paramOne?: string;
  paramTwo?: string;
  paramThree?: string;
}

function InternalActual(props: ActualProps, ref: React.ForwardedRef<ActualComponentRef>) {
  const { operationType, paramOne, paramTwo, paramThree } = props;
  const [form] = Form.useForm();

  // 上传文件部分
  const [attachments, setAttachments] = useSafeState<UploadFile[]>([]);

  const handleFinish = (values: any) => {
    console.log('values', values);
    if (attachments.filter((i) => i.status !== 'done').length) {
      message.info('请等待附件上传完成');
      return;
    }

    const request = requestMap[operationType];
    request({
      ...values,
      paramOne,
      paramTwo,
      paramThree,
    }).then((res) => {
      if (res?.success || res?.['select-multiple']) {
        message.success('操作成功');
        props?.afterSuccess?.();
      }
    });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        submit() {
          form?.submit?.();
        },
      };
    },
    [form],
  );

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form form={form} labelCol={{ style: { width: 150 } }} colon={false} onFinish={handleFinish}>
      <Form.Item label='Plain Text'>
        <span className='ant-form-text'>Actual</span>
      </Form.Item>
      <Form.Item name='select-multiple' label='Select[multiple]' rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}>
        <Select mode='multiple' placeholder='Please select favourite colors'>
          <Select.Option value='red'>Red</Select.Option>
          <Select.Option value='green'>Green</Select.Option>
          <Select.Option value='blue'>Blue</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label='附件上传' name='attachments' valuePropName='fileList' getValueFromEvent={normFile}>
        <Upload.Dragger
          onChange={({ fileList }) => {
            setAttachments(fileList);
          }}
        >
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag file to this area to upload</p>
          <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </Form.Item>
    </Form>
  );
}

export default forwardRef(InternalActual);

export interface ActualComponentRef {
  submit: () => void;
}

const requestMap = {
  [OperationEnum.a]: (params: any) => Promise.resolve(params),
  [OperationEnum.b]: (params: any) => Promise.resolve(params),
  [OperationEnum.c]: (params: any) => Promise.resolve(params),
};

type OperationUnion = `${OperationEnum}`;
type OperationType = Extract<OperationUnion, 'AA' | 'BB' | 'CC' | 'DD'>;
