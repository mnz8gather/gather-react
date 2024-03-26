import { useRef, ReactNode, Key } from 'react';
import { useEventListener } from 'ahooks';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ChatBubble from '@/components/pure.ChatBubble';
import styles from './index.module.less';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export default (props: { data: any; currentAccount: any }) => {
  const { data, currentAccount } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      // 调整滚轮方向
      scrollRef?.current?.scrollBy?.(0, -event.deltaY);
    },
    { target: scrollRef },
  );

  return (
    <>
      <div
        style={{
          height: '600px',
          overflow: 'auto',
        }}
        className={styles['message-list']}
        ref={scrollRef}
      >
        <div className={styles['message-view']}>
          {data.map((ele: { account: string; type: string; id: Key; content: string; nickname: string }) => {
            const isCurrent = ele?.account === currentAccount;
            if (ele.type === 'normal') {
              return (
                <div key={ele?.id} className={styles['message-list-item']}>
                  <ChatItem
                    content={<span style={{ wordBreak: 'break-all' }}>{ele.content}</span>}
                    placement={isCurrent ? 'left' : 'right'}
                    nickname={isCurrent ? undefined : ele.nickname}
                  />
                </div>
              );
            }
            return (
              <div key={ele?.id} className={styles['message-list-item']}>
                <Notice>{ele.content}</Notice>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function ChatItem(props: { placement: Placement; nickname: any; content: ReactNode }) {
  const flexDirection = props?.placement === 'left' ? 'row-reverse' : undefined;

  return (
    <div style={{ display: 'flex', flexDirection }}>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      <div className={styles['chat-item-right']}>
        {props?.nickname && <Nickname>{props?.nickname}</Nickname>}
        <ChatBubble content={props?.content} placement={props?.placement} bubbleStyle={{ flexBasis: 'fit-content' }} />
      </div>
    </div>
  );
}

function Notice(props: { children: string }) {
  return (
    <div className={styles['chat-notice']}>
      <div>{props?.children}</div>
    </div>
  );
}

function Nickname(props: { children: string }) {
  return (
    <div className={styles['chat-nickname']}>
      <div>{props?.children}</div>
    </div>
  );
}

type Placement = 'left' | 'right';
