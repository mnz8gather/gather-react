import { Avatar } from 'antd';
import type { AvatarProps } from 'antd';
import styles from './index.module.less';

const GroupAvatar = (props: GroupAvatarProps) => {
  const { src, avatarProps } = props;

  const maxCount = 9;
  const srcShow = Array.isArray(src) ? src.slice(0, maxCount) : [];

  return (
    <div className={styles['group-avatar']} style={props.style}>
      {srcShow.map((src, index) => (
        <div className={styles['single-avatar']} key={`group-avatar-${index}`}>
          <Avatar src={src} style={{ width: '100%', height: '100%' }} {...avatarProps} />
        </div>
      ))}
    </div>
  );
};

export { GroupAvatar };

interface GroupAvatarProps {
  style?: React.CSSProperties;
  src?: string[];
  avatarProps?: AvatarProps;
}
