import Alpha from '@/components/AlphaMecha';
import GeneralContainer from '@/layouts/GeneralContainer';

function AlphaMecha() {
  return (
    <GeneralContainer>
      <Alpha.Button
        modalProps={{
          someCode: 'someCode',
          width: '1000px',
          footer: null,
          destroyOnClose: true,
          bodyStyle: { paddingTop: '40px' },
        }}
        type='primary'
      >
        Alpha Button
      </Alpha.Button>
    </GeneralContainer>
  );
}

export default AlphaMecha;
