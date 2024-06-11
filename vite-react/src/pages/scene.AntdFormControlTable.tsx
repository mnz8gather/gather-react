import { useEffect } from 'react';
import { Form } from 'antd';
import { GeneralContainer } from '@/alpha/layout/GeneralContainer';
import { GeneralHeader } from '@/alpha/layout/GeneralHeader';
import { AntdFormControlTable } from '@/scene/Antd.Form.control.table';

export default () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ antdFormControlTable: [{ name: '3' }] });
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>不在 Form 中</GeneralHeader>
        <AntdFormControlTable />
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>在 Form 中</GeneralHeader>
        <Form>
          <Form.Item name='antdFormControlTable' label='AntdFormControlTable'>
            <AntdFormControlTable />
          </Form.Item>
        </Form>
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>使用 initialValues</GeneralHeader>
        <Form initialValues={{ antdFormControlTable: [{ name: '2' }] }}>
          <Form.Item name='antdFormControlTable' label='AntdFormControlTable'>
            <AntdFormControlTable />
          </Form.Item>
        </Form>
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>使用 setFieldsValue</GeneralHeader>
        <div>参考 antd 文档中的自定义组件，修改后满足四种情况</div>
        <Form form={form}>
          <Form.Item name='antdFormControlTable' label='AntdFormControlTable'>
            <AntdFormControlTable />
          </Form.Item>
        </Form>
      </GeneralContainer>
    </div>
  );
};

const containerStyle = { flex: '1 1 calc(50% - 20px)' };
