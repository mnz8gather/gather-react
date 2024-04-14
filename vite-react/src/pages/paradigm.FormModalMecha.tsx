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
        modalProps={{ title: 'FormModalMecha' }}
      />
    </GeneralContainer>
  );
}
