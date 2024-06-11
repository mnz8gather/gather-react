import { BubbleTips } from '@/scene/Antd.BubbleTips';
import { GeneralContainer } from '@/alpha/layout/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <BubbleTips tipType='level' tipIndex={1}>
        <span>{1}级</span>
      </BubbleTips>
      <br />
      <br />
      <br />
      <BubbleTips tipType='type' tipIndex={1}>
        <span>{1}类</span>
      </BubbleTips>
    </GeneralContainer>
  );
};
