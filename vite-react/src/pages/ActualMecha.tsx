import Actual from '@/components/ActualMecha';
import GeneralContainer from '@/layouts/GeneralContainer';
import GeneralHeader from '@/layouts/GeneralHeader';

export default function () {
  return (
    <>
      <GeneralHeader>实际机甲</GeneralHeader>
      <GeneralContainer>
        <Actual.Button type='primary' actualProps={{ operationType: 'AA', paramOne: 'paramOne' }} windowProps={{ type: 'drawer' }}>
          Actual Button
        </Actual.Button>
      </GeneralContainer>
    </>
  );
}
