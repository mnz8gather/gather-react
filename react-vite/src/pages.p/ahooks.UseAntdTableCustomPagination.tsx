import { GeneralContainer } from '@/shared/GeneralContainer';
import { GeneralHeader } from '@/shared/GeneralHeader';
import { UseAntdTableCustomPagination } from '@/FK/Ahooks.useAntdTable.CustomPagination';

export default function () {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <GeneralContainer>
        <GeneralHeader>ahooks useAntdTable 自定义分页</GeneralHeader>
        <UseAntdTableCustomPagination />
      </GeneralContainer>
    </div>
  );
}
