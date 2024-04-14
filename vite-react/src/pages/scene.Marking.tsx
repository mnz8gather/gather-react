import { Form, Input, Button } from 'antd';
import { useRequest } from 'ahooks';
import Mark from '@/scene/Antd.Marking';
import { useState } from 'react';
import GeneralContainer from '@/alpha/layout/GeneralContainer';
import { video_label } from '@/services/videoInfo';

export default () => {
  const [search, setSearch] = useState<React.Key[]>();
  const [search2, setSearch2] = useState<React.Key[]>([11, 22, 33]);

  const { data: marks } = useRequest(video_label);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <GeneralContainer style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      <GeneralContainer style={{ width: '500px', height: '500px', overflow: 'auto', padding: '10px', backgroundColor: '#fff' }}>
        <Mark.Search value={search2} />
      </GeneralContainer>
      <GeneralContainer style={{ width: '500px', height: '500px', overflow: 'auto', padding: '10px', backgroundColor: '#fff' }}>
        <Mark.Search
          onChange={(v) => {
            console.log('only onChange v', v);
          }}
        />
      </GeneralContainer>
      <GeneralContainer style={{ width: '500px', height: '500px', overflow: 'auto', padding: '10px', backgroundColor: '#fff' }}>
        <Mark.Search
          value={search}
          onChange={(v) => {
            setSearch(v);
          }}
        />
      </GeneralContainer>
      <Mark.Button id={0} modalProps={{ editAccess: true }} />
      <GeneralContainer style={{ width: '500px', height: '500px', overflow: 'auto', padding: '10px', backgroundColor: '#fff' }}>
        <Mark.Preview labels={[12, 21, 31, 41, 44, 61, 62, 63, 64, 65, 66, 67, 68, 69, 610, 612]} marks={marks?.result} />
      </GeneralContainer>
      <GeneralContainer style={{ width: '500px', height: '500px', overflow: 'auto', padding: '10px', backgroundColor: '#fff' }}>
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
      </GeneralContainer>
    </GeneralContainer>
  );
};
