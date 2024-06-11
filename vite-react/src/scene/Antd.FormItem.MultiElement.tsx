import { Form, Input } from 'antd';

/**
 * 一种简单的写法
 * 不使用这种，就自定义组件
 */
export function AntdFormItemMultiElement() {
  return (
    <Form initialValues={{ demo: '123' }}>
      <Form.Item label='demo'>
        <>prefix</>
        <Form.Item name='demo' noStyle>
          <Input placeholder='render props' style={{ width: 200, margin: '0 10px' }} />
        </Form.Item>
        <>suffix</>
      </Form.Item>
    </Form>
  );
}
