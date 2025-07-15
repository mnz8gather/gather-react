import { Alpha } from '@/scene/Antd.AlphaMecha';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { GeneralHeader } from '@/shared/GeneralHeader';

function AlphaMecha() {
  return (
    <>
      <GeneralHeader>第一版机甲</GeneralHeader>
      <GeneralContainer>
        <Alpha.Button
          modalProps={{
            someCode: 'someCode',
            width: '1000px',
            footer: null,
            destroyOnClose: true,
            styles: { body: { paddingTop: '40px' } },
          }}
          type='primary'
        >
          Alpha Button
        </Alpha.Button>
      </GeneralContainer>
    </>
  );
}

export default AlphaMecha;
