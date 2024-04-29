import { Space } from 'antd';
import Actual from '@/scene/Antd.ActualMecha';
import GeneralContainer from '@/alpha/layout/GeneralContainer';
import GeneralHeader from '@/alpha/layout/GeneralHeader';

export default function () {
  return (
    <>
      <GeneralHeader>实际机甲</GeneralHeader>
      <GeneralContainer>
        <Space>
          <Actual.Button type='primary' mechaProps={{ actualProps: { operationType: 'AA', paramOne: 'paramOne' }, windowType: 'drawer' }}>
            drawer
          </Actual.Button>
          <Actual.Button
            type='primary'
            mechaProps={{
              actualProps: { operationType: 'AA', paramOne: 'paramOne' },
              windowType: 'modal',
              modalProps: { title: '自定义标题' },
            }}
          >
            modal
          </Actual.Button>
          <Actual.Mecha
            render={(onClick) => {
              return <span onClick={onClick}>文字</span>;
            }}
            actualProps={{ operationType: 'BB', paramOne: 'paramOne' }}
            windowType='modal'
          />
        </Space>
      </GeneralContainer>
    </>
  );
}
