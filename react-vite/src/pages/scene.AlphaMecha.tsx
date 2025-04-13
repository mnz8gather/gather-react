import { Alpha } from '@/scene/Antd.AlphaMecha';
import { GeneralContainer } from '@/share/GeneralContainer';
import { GeneralHeader } from '@/share/GeneralHeader';

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
