import { Space } from 'antd';
import { useToggle } from 'ahooks';
import OptionalTag from '@/components/OptionalTag';
import GeneralContainer from '@/components/alpha.layout/GeneralContainer';

export default () => {
  const [a, { toggle }] = useToggle(true);

  return (
    <GeneralContainer
      style={{ margin: '30px', backgroundColor: '#fff', width: '500px', height: '500px', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}
    >
      <div>
        <Space>
          <OptionalTag>OptionalTag</OptionalTag>
          <OptionalTag
            checked={a}
            onChange={(uv) => {
              console.log('uv', uv);
              toggle();
            }}
          >
            OptionalTag
          </OptionalTag>
          <OptionalTag checked>OptionalTag</OptionalTag>
        </Space>
      </div>
      <div>
        <OptionalTag.Group>
          <OptionalTag>Group1</OptionalTag>
          <OptionalTag>Group2</OptionalTag>
        </OptionalTag.Group>
      </div>
      <div>
        <div>给定长度是否换行</div>
        <div style={{ width: '200px' }}>
          <OptionalTag>LogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTagLogTag</OptionalTag>
        </div>
        <div style={{ width: '200px' }}>
          <OptionalTag>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</OptionalTag>
        </div>
      </div>
    </GeneralContainer>
  );
};
