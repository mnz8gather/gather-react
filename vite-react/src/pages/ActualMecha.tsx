import Actual from '@/components/ActualMecha';
import GeneralContainer from '@/layouts/GeneralContainer';

export default function () {
  return (
    <GeneralContainer>
      <Actual.Button type='primary' actualProps={{ operationType: 'AA', paramOne: 'paramOne' }} windowProps={{ type: 'drawer' }}>
        Actual Button
      </Actual.Button>
    </GeneralContainer>
  );
}
