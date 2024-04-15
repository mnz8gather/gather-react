import { Form, Input } from 'antd';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import type { FormProps } from 'antd';

export interface InternalFormProps {
  formProps?: Omit<FormProps, 'form' | 'onFinish'>;
  afterFinish?: (values: FormValues) => void;
}

function InternalForm(props: InternalFormProps, ref: React.ForwardedRef<InternalFormRef>) {
  const { formProps, afterFinish } = props;
  const [form] = Form.useForm();

  const handleFinish = useCallback((values: FormValues) => {
    afterFinish?.(values);
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
    <Form<FormValues> {...formProps} form={form} onFinish={handleFinish}>
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

interface FormValues {
  name?: string;
}
