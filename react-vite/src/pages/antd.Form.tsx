import { Button, Form, Input, Modal, Space } from 'antd';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';
import type { ButtonProps } from 'antd';

const items = [
  {
    key: 'form-dialog',
    label: '对话框表单',
  },
];

// FormListRenderTable
// CustomizedComponent
// item-dependencies
// ItemMultiElement
export function AntdFormPage() {
  const [current, setCurrent] = useState('form-dialog');
  return (
    <GeneralTab title='antd Form' items={items} value={current} onChange={setCurrent}>
      {current === 'form-dialog' ? <FormDialog /> : null}
    </GeneralTab>
  );
}

function FormDialog() {
  const [initialValues, setInitialValues] = useState<CustomsDeclarationValues>();
  const [openCustomsDeclaration, setOpenCustomsDeclaration] = useState(false);
  const customsDeclarationRef = useRef<CustomsDeclarationRef>(null);
  const offen = useCallback(() => {
    setOpenCustomsDeclaration(true);
  }, []);
  const close = useCallback(() => {
    setOpenCustomsDeclaration(false);
    setInitialValues(undefined);
  }, []);
  const edit = useCallback<Required<ButtonProps>['onClick']>(() => {
    setInitialValues({
      passportCountry: '1',
      passportNumber: '2',
      residenceCountry: '3',
    });
    offen();
  }, []);
  const ok = useCallback(() => {
    customsDeclarationRef.current?.submit?.();
  }, []);
  const afterSuccess = useCallback(() => {
    close();
  }, []);
  return (
    <>
      <Space>
        <Button onClick={offen}>添加</Button>
        <Button onClick={edit}>编辑</Button>
      </Space>
      <Modal destroyOnHidden open={openCustomsDeclaration} onCancel={close} onOk={ok} title={initialValues ? 'Edit' : 'Add'} width={600}>
        <RefCustomsDeclaration ref={customsDeclarationRef} initialValues={initialValues} afterSuccess={afterSuccess} />
      </Modal>
    </>
  );
}

interface CustomsDeclarationValues {
  passportCountry?: string;
  passportNumber?: string;
  residenceCountry?: string;
}

interface CustomsDeclarationRef {
  submit: () => void;
}

interface CustomsDeclarationProps {
  initialValues?: CustomsDeclarationValues;
  afterSuccess?: () => void;
}

function CustomsDeclaration(props: CustomsDeclarationProps, ref: React.ForwardedRef<CustomsDeclarationRef>) {
  const { initialValues, afterSuccess } = props;
  const [form] = Form.useForm();
  const finish = useCallback(
    (values: CustomsDeclarationValues) => {
      console.debug(values);
      afterSuccess?.();
    },
    [afterSuccess],
  );
  useImperativeHandle(ref, () => {
    return {
      submit: form.submit,
    };
  }, [form]);
  return (
    <>
      <Form form={form} initialValues={initialValues} onFinish={finish} labelCol={{ span: 12 }} labelAlign='left'>
        <Form.Item name='passportCountry' label='Passport issued by (country)'>
          <Input />
        </Form.Item>
        <Form.Item name='passportNumber' label='Passport number'>
          <Input />
        </Form.Item>
        <Form.Item name='residenceCountry' label='Country of Residence'>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

const RefCustomsDeclaration = forwardRef(CustomsDeclaration);
