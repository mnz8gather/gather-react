import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { GeneralHeader } from '@/shared/GeneralHeader';
import { CustomizedComponent } from '@/BX/Antd.Form.CustomizedComponent';
import type { TimeInputValue } from '@/BX/Antd.Form.CustomizedComponent';

export default () => {
  const [initialValueIsUndefined, setInitialvalueisundefined] = useState<TimeInputValue>();
  const [time, setTime] = useState<TimeInputValue>({ timeNumber: 24, timeUnit: 'HOUR' });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ customizedComponent: { timeNumber: 888, timeUnit: 'MINUTE' } });
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>非受控</GeneralHeader>
        <CustomizedComponent />
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>受控 初始值未定义</GeneralHeader>
        <div>传递的 value 就是 undefined</div>
        <CustomizedComponent
          value={initialValueIsUndefined}
          onChange={(value) => {
            setInitialvalueisundefined(value);
          }}
        />
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>受控 设置初始值</GeneralHeader>
        <CustomizedComponent
          value={time}
          onChange={(value) => {
            setTime(value);
          }}
        />
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>在 Form 中</GeneralHeader>
        <Form>
          <Form.Item name='customizedComponent' label='AntdFormControlTable'>
            <CustomizedComponent {...timeInputStyle} />
          </Form.Item>
        </Form>
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>Form 中使用 initialValues</GeneralHeader>
        <Form initialValues={{ customizedComponent: { timeNumber: 666, timeUnit: 'MINUTE' } }}>
          <Form.Item name='customizedComponent' label='AntdFormControlTable'>
            <CustomizedComponent {...timeInputStyle} />
          </Form.Item>
        </Form>
      </GeneralContainer>
      <GeneralContainer style={containerStyle}>
        <GeneralHeader>Form 中使用 setFieldsValue</GeneralHeader>
        <Form form={form}>
          <Form.Item name='customizedComponent' label='AntdFormControlTable'>
            <CustomizedComponent {...timeInputStyle} />
          </Form.Item>
        </Form>
      </GeneralContainer>
    </div>
  );
};

const containerStyle = { flex: '1 1 calc(33.33% - 20px)' };

const timeInputStyle = { inputStyle: { width: 100 }, selectStyle: { width: 80, margin: '0 8px' } };
