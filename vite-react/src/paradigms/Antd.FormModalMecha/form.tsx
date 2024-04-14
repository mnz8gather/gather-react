import { Form, Input } from 'antd';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import type { FormProps } from 'antd';

export interface InternalFormProps {
  formProps?: Omit<FormProps, 'form' | 'onFinish'>;
  afterFinish?: () => void;
}

function InternalForm(props: InternalFormProps, ref: React.ForwardedRef<InternalFormRef>) {
  const { formProps, afterFinish } = props;
  const [form] = Form.useForm();

  const handleFinish = useCallback((values: any) => {
    console.log('values', values);
    afterFinish?.();
  }, []);

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

  return (
    <Form {...formProps} form={form} onFinish={handleFinish}>
      <Form.Item name='name' label='Name'>
        <Input />
      </Form.Item>
    </Form>
  );
}

export default forwardRef(InternalForm);

export interface InternalFormRef {
  submit: () => void;
}
