import Actual from '@/components/ActualMecha';
import GeneralContainer from '@/components/alpha.layout/GeneralContainer';
import GeneralHeader from '@/components/alpha.layout/GeneralHeader';

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
