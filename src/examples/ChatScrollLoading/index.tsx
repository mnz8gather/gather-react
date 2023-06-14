import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { useEventListener, useInfiniteScroll } from 'ahooks';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ChatBubble from '@/components/ChatBubble';
import styles from './index.module.less';

const resultData = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  content: Math.random().toString(36).slice(-6),
  account: index % 7 === 0 ? 'mei13' : '567',
  type: index % 5 === 0 ? 'notice' : 'normal',
  nickname: index % 7 === 0 ? '梅十三' : '五六七',
}));

const InternalChatScrollLoading: React.ForwardRefRenderFunction<ChatScrollLoadingRef, ChatScrollLoadingProps> = (props, ref) => {
  const { currentAccount, ...rest } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      // 调整滚轮方向
      wrapperRef?.current?.scrollBy?.(0, -event.deltaY);
    },
    { target: wrapperRef }
  );

  async function requestChatContent(current: number, pageSize: number): Promise<Result> {
    // normal request real data
    const total = resultData.length;
    const list = resultData.slice(current * pageSize, current * pageSize + pageSize);

    const r = { total, list, current, pageSize };

    return r;
  }

  const { data, mutate } = useInfiniteScroll(
    (d) => {
      const current = d ? d?.current + 1 : 0;
      return requestChatContent(current, 20);
    },
    {
      target: wrapperRef,
      isNoMore: (d) => {
        if (d === undefined) {
          return true;
        }
        return d?.current * d?.pageSize > d?.total;
      },
    }
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        mutate,
        scrollBottom() {
          if (wrapperRef?.current?.scrollTop) {
            wrapperRef.current.scrollTop = 0;
          }
        },
      };
    },
    [wrapperRef]
  );

  return (
    <>
      <div className={styles['message-list']} ref={wrapperRef} {...rest}>
        <div className={styles['message-view']}>
          {data?.list.map((ele: { account: string; type: string; id: React.Key; content: string; nickname: string }) => {
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

function ChatItem(props: { placement: Placement; nickname: any; content: React.ReactNode }) {
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

export interface Result {
  list: any[];
  total: number;
  current: number;
  pageSize: number;
}

export interface ChatScrollLoadingRef {
  mutate: React.Dispatch<React.SetStateAction<Result | undefined>>;
  scrollBottom: () => void;
}

interface ChatScrollLoadingProps {
  currentAccount: any;
  style?: React.CSSProperties;
}

const ChatScrollLoading = forwardRef<ChatScrollLoadingRef, ChatScrollLoadingProps>(InternalChatScrollLoading);

export default ChatScrollLoading;
