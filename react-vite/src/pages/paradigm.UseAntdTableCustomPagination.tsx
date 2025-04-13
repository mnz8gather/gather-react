import { GeneralContainer } from '@/share/GeneralContainer';
import { GeneralHeader } from '@/share/GeneralHeader';
import { UseAntdTableCustomPagination } from '@/paradigms/Ahooks.useAntdTable.CustomPagination';

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
