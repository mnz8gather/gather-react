import { Badge } from 'antd';
import { GroupAvatar } from '@/shared/GroupAvatar';
import styles from './index.module.less';

const ChatGroupList = (props: { data: any }) => {
  const { data } = props;

  return (
    <div className={styles['group-list']}>
      {data.map((group: { url: string; name: any; lastMessage: any }, index: any) => {
        const groupAvatar = <GroupAvatar src={[group.url, group.url, group.url]} />;
        const prefix = <Badge count={6}>{groupAvatar}</Badge>;

        return (
          <GroupListItem
            key={index}
            prefix={prefix}
            groupName={group.name}
            lastMessage={group.lastMessage}
            onClick={() => {
              // go to chat
            }}
          />
        );
      })}
    </div>
  );
};

export { ChatGroupList };

function GroupListItem(props: { [x: string]: any; prefix: any; groupName: any; lastMessage: any }) {
  const { prefix, groupName, lastMessage, ...rest } = props;

  return (
    <div className={styles['group-list-item']} {...rest}>
      <div className={styles['item-prefix']}>{prefix}</div>
      <div className={styles['item-among']}>
        <div className={styles['item-group-name']}>{groupName}</div>
        <div className={styles['item-group-last-message']}>{lastMessage}</div>
      </div>
    </div>
  );
}
