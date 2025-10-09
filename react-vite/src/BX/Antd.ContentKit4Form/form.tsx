import { Form, Input } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import type { FormProps } from 'antd';

export interface CkFormRef {
  do: () => void;
}

export interface FormValues {
  name?: string;
}

interface CkFormProps extends FormProps {}

function CkForm(props: CkFormProps, ref: React.ForwardedRef<CkFormRef>) {
  useImperativeHandle(ref, () => {
    return {
      do() {
        console.debug('do something');
      },
    };
  }, []);

  return (
    <Form<FormValues> {...props}>
      <Form.Item name='name' label='Name'>
        <Input />
      </Form.Item>
    </Form>
  );
}

const ForwardCkForm = forwardRef(CkForm);

export { ForwardCkForm };
