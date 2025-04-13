import { Button } from 'antd';
import { GeneralContainer } from '@/share/GeneralContainer';
import { Content4Form } from '@/paradigms/Antd.ContentKit4Form';

export default function () {
  return (
    <GeneralContainer>
      <Content4Form.Mecha
        render={(onClick) => {
          return <Button onClick={onClick}>Content4Form Button</Button>;
        }}
        modalProps={{
          title: 'Content4Form',
          width: 600,
        }}
        formProps={{
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }}
        onFinish={(values, setOpen) => {
          console.log('onFinish values', values);
          setOpen(false);
        }}
      />
    </GeneralContainer>
  );
}
