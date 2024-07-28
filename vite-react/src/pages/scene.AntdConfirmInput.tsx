import { ConfirmInput } from '@/scene/Antd.ConfirmInput';
import { GeneralContainer } from '@/alpha/layout/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <div style={{ width: 200, height: 200, backgroundColor: 'floralwhite' }}>
        123
        <ConfirmInput />
      </div>
    </GeneralContainer>
  );
};
