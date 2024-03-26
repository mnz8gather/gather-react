import CanceledRadio from '@/components/CanceledRadio';
import GeneralContainer from '@/components/layout.GeneralContainer';
import { Checkbox, Form, Input, Button } from 'antd';

const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <GeneralContainer>
      <div>
        <CanceledRadio.Group
          options={options}
          onChange={(v) => {
            console.log('CanceledRadio', v);
          }}
        />
      </div>
      <div>
        <CanceledRadio.Group
          options={options}
          defaultValue={['Apple', 'Pear', 'Orange']}
          onChange={(v) => {
            console.log('CanceledRadio', v);
          }}
        />
      </div>
      <div>
        <CanceledRadio.Group
          options={options}
          value={['Apple', 'Pear', 'Orange']}
          onChange={(v) => {
            console.log('CanceledRadio', v);
          }}
        />
      </div>
      <div>
        <Checkbox.Group
          options={options}
          defaultValue={['Apple', 'Pear', 'Orange']}
          onChange={(v) => {
            console.log('Checkbox', v);
          }}
        />
      </div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label='Label' name='label'>
          <CanceledRadio.Group options={options} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </GeneralContainer>
  );
};
