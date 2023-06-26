import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useRequest } from 'ahooks';
import Mark from '@/components/Marking';

export default () => {
  const { data: marks } = useRequest<{ data: Marks }, unknown[]>(() => axios('/mock/person-info/key-person/label/list'));

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Mark.Button id={0} />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '500px' }}>
          <Mark.Preview labels={[12, 21, 31, 41, 44, 61, 62, 63, 64, 65, 66, 67, 68, 69, 610, 612]} marks={marks?.data} />
        </div>
        <div>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete='off'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              label: [12, 21, 41, 44],
            }}
          >
            <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label='mark' name='label' noStyle>
              <Mark layout='horizontal' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} component={false} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* <Mark layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} component={false} value={[12, 21, 31, 41, 44]} /> */}
        </div>
      </div>
    </>
  );
};
