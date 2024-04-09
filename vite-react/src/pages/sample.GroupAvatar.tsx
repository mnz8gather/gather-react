import GroupAvatar from '@/scene/Antd.GroupAvatar';
import GeneralContainer from '@/alpha/layout/GeneralContainer';

export default () => {
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

  return (
    <GeneralContainer>
      <GroupAvatar style={{ width: '100px', height: '100px' }} avatarProps={{ shape: 'square' }} src={[url, url, url]} />
    </GeneralContainer>
  );
};
