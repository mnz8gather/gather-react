import { GroupAvatar } from '@/shared/GroupAvatar';
import { GeneralContainer } from '@/shared/GeneralContainer';

export function GroupAvatarPage() {
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
  return (
    <GeneralContainer title='聊天组头像'>
      <GroupAvatar style={{ width: '100px', height: '100px' }} avatarProps={{ shape: 'square' }} src={[url, url, url]} />
    </GeneralContainer>
  );
}
