import { SaveInput } from '@/FK/Antd.SaveInput';
import { GeneralContainer } from '@/share/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <SaveInput buttonChildren='保存' styles={{ input: { width: '200px' } }} />
    </GeneralContainer>
  );
};
