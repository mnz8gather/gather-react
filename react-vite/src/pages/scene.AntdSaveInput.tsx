import { SaveInput } from '@/FK/Antd.SaveInput';
import { GeneralContainer } from '@/shared/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <SaveInput buttonChildren='保存' styles={{ input: { width: '200px' } }} />
    </GeneralContainer>
  );
};
