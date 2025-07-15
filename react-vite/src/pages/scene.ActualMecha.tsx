import { Space } from 'antd';
import { Actual } from '@/scene/Antd.ActualMecha';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { GeneralHeader } from '@/shared/GeneralHeader';

export default function () {
  return (
    <>
      <GeneralHeader>实际机甲</GeneralHeader>
      <GeneralContainer>
        <Space>
          <Actual.Button type='primary' actualProps={{ operationType: 'AA', paramOne: 'drawer' }} windowProps={{ windowType: 'drawer' }}>
            drawer
          </Actual.Button>
          <Actual.Button
            type='primary'
            actualProps={{ operationType: 'BB', paramOne: 'modal' }}
            windowProps={{ windowType: 'modal' }}
            modalProps={{ title: 'modal actual' }}
          >
            modal
          </Actual.Button>
          <Actual.Mecha
            render={(onClick) => {
              return (
                <div style={{ padding: 20, border: '1px solid darkseagreen', color: 'darkseagreen' }} onClick={onClick}>
                  Mecha
                </div>
              );
            }}
            windowProps={{ windowType: 'modal' }}
            actualProps={{ operationType: 'CC', paramOne: 'Mecha' }}
          />
        </Space>
      </GeneralContainer>
    </>
  );
}
