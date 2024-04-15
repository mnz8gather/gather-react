import { useEffect } from 'react';
import { Form } from 'antd';
import GeneralContainer from '@/alpha/layout/GeneralContainer';
import GeneralHeader from '@/alpha/layout/GeneralHeader';
import AntdFormControlTable from '@/scene/Antd.Form.control.table';

export default () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ antdFormControlTable: [{ name: '3' }] });
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <GeneralContainer>
        <GeneralHeader>不在 Form 中</GeneralHeader>
        <AntdFormControlTable />
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>在 Form 中</GeneralHeader>
        <Form>
          <Form.Item name='antdFormControlTable' label='AntdFormControlTable'>
            <AntdFormControlTable />
          </Form.Item>
        </Form>
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>使用 initialValues</GeneralHeader>
        <div>initialValues 不存在 setFieldsValue 的问题</div>
        <Form initialValues={{ antdFormControlTable: [{ name: '2' }] }}>
          <Form.Item name='antdFormControlTable' label='AntdFormControlTable'>
            <AntdFormControlTable />
          </Form.Item>
        </Form>
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>使用 setFieldsValue</GeneralHeader>
        <div>这个目前存在问题，添加时会覆盖数据，原因是老问题，因为 dataSource 在 useState 初始化时 value 是 undefined, value 的后续变化，不会在更新</div>
        <Form form={form}>
          <Form.Item name='antdFormControlTable' label='AntdFormControlTable'>
            <AntdFormControlTable />
          </Form.Item>
        </Form>
      </GeneralContainer>
    </div>
  );
};
