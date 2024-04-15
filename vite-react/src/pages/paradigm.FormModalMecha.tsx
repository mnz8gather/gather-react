import { Button } from 'antd';
import GeneralContainer from '@/alpha/layout/GeneralContainer';
import FormModalMecha from '@/paradigms/Antd.FormModalMecha';

export default function () {
  return (
    <GeneralContainer>
      <FormModalMecha.Mecha
        render={(onClick) => {
          return <Button onClick={onClick}>FormModalMecha</Button>;
        }}
        modalProps={{
          title: 'FormModalMecha',
          width: 600,
        }}
        internalFormProps={{
          formProps: {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          },
          afterFinish: (values) => {
            console.log('afterFinish values', values);
          },
        }}
      />
    </GeneralContainer>
  );
}
