import { SaveInput } from '@/scene/Antd.SaveInput';
import { GeneralContainer } from '@/alpha/layout/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <SaveInput buttonChildren='保存' styles={{ input: { width: '200px' } }} />
    </GeneralContainer>
  );
};
