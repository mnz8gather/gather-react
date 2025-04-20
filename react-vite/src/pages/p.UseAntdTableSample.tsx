import { GeneralContainer } from '@/share/GeneralContainer';
import { GeneralHeader } from '@/share/GeneralHeader';
import { UseAntdTableSample, DefaultParams, Extra } from '@/FK/Ahooks.useAntdTable';

export default function () {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <GeneralContainer>
        <GeneralHeader>一般情况</GeneralHeader>
        <UseAntdTableSample />
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>设置初始化参数</GeneralHeader>
        <DefaultParams />
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>Ireland</GeneralHeader>
        <Extra country='Ireland' />
      </GeneralContainer>
      <GeneralContainer>
        <GeneralHeader>Finland</GeneralHeader>
        <Extra country='Finland' />
      </GeneralContainer>
    </div>
  );
}
