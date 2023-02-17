import { GroupAvatar } from '@/examples';

export default () => {
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

  return <GroupAvatar style={{ width: '100px', height: '100px' }} avatarProps={{ shape: 'square' }} src={[url, url, url]} />;
};
