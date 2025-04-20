import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, message, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useSafeState } from 'ahooks';
import { OperationEnum } from './interface';
import type { FormProps } from 'antd';
import type { UploadFile } from 'antd/lib/upload/interface';

export interface ActualRef {
  do: () => void;
}

export type ActualFormOmitKey = 'onFinish';

export interface ActualProps {
  formProps?: Omit<FormProps, ActualFormOmitKey>;
  operationType?: OperationType;
  paramOne?: string;
  paramTwo?: string;
  paramThree?: string;
  afterFinish?: () => void;
}

function Actual(props: ActualProps, ref: React.ForwardedRef<ActualRef>) {
  const { operationType, paramOne, paramTwo, paramThree, afterFinish, formProps } = props;

  // 上传文件部分
  const [attachments, setAttachments] = useSafeState<UploadFile[]>([]);

  const handleFinish = (values: any) => {
    console.log('values', values);
    if (attachments.filter((i) => i.status !== 'done').length) {
      message.info('请等待附件上传完成');
      return;
    }
    const typeTemp = operationType ?? OperationEnum.a;
    const request = requestMap[typeTemp];
    request({
      ...values,
      paramOne,
      paramTwo,
      paramThree,
    }).then((res) => {
      if (res?.success || res?.['select-multiple']) {
        message.success('操作成功');
        afterFinish?.();
      }
    });
  };

  useImperativeHandle(ref, () => {
    return {
      do() {
        console.log('do');
      },
    };
  }, []);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form labelCol={{ style: { width: 150 } }} colon={false} {...formProps} onFinish={handleFinish}>
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

const ForwardActual = forwardRef(Actual);

export { ForwardActual };

const requestMap = {
  [OperationEnum.a]: (params: any) => Promise.resolve(params),
  [OperationEnum.b]: (params: any) => Promise.resolve(params),
  [OperationEnum.c]: (params: any) => Promise.resolve(params),
};

type OperationUnion = `${OperationEnum}`;
type OperationType = Extract<OperationUnion, 'AA' | 'BB' | 'CC' | 'DD'>;
