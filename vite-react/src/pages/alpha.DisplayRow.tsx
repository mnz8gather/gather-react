import DisplayRow from '@/components/alpha.DisplayRow';
import GeneralContainer from '@/components/alpha.layout/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <div style={{ width: '400px' }}>
        <DisplayRow label='隐约雷鸣'>隐约雷鸣 阴霾天空 但盼风雨来 能留你在此{'\r\n'}隐约雷鸣 阴霾天空 即使天无雨 我亦留此地</DisplayRow>
        <DisplayRow label='阴霾'>隐约雷鸣 阴霾天空 但盼风雨来 能留你在此{'\r\n'}隐约雷鸣 阴霾天空 即使天无雨 我亦留此地</DisplayRow>
        <DisplayRow label='天空'>隐约雷鸣 阴霾天空 但盼风雨来 能留你在此 隐约雷鸣 阴霾天空 即使天无雨 我亦留此地</DisplayRow>
      </div>
    </GeneralContainer>
  );
};
