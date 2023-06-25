import { useRef } from 'react';
import ChatScrollLoading from '@/components/ChatScrollLoading';
import type { ChatScrollLoadingRef, Result } from '@/components/ChatScrollLoading';

const revokeMessage = {
  id: 6,
  content: '撤回消息',
  account: 'mei13',
  type: 'notice',
  nickname: '梅十三',
};

export default () => {
  const chatScrollLoadingRef = useRef<ChatScrollLoadingRef>(null);

  function mutateMessage() {
    chatScrollLoadingRef?.current?.mutate((lastData) => {
      lastData?.list.unshift({
        id: new Date().getTime(),
        content: Math.random().toString(36).slice(-6),
        account: Math.floor(Math.random() * 77) % 7 === 0 ? 'mei13' : '567',
        type: Math.floor(Math.random() * 77) % 5 === 0 ? 'notice' : 'normal',
        nickname: Math.floor(Math.random() * 77) % 7 === 0 ? '梅十三' : '五六七',
      });
      return { ...lastData } as Result;
    });
  }

  function mutateRevoke() {
    chatScrollLoadingRef?.current?.mutate((lastData) => {
      const index = lastData?.list.findIndex((i) => i?.id === 6);
      if (index && index !== -1) {
        lastData?.list.splice(index, 1, revokeMessage);
      }
      return { ...lastData } as Result;
    });
  }

  return (
    <div style={{ height: '100%' }}>
      <ChatScrollLoading
        currentAccount='567'
        style={{
          height: '600px',
        }}
        ref={chatScrollLoadingRef}
      />
      <br />
      <button
        onClick={() => {
          mutateMessage();
        }}
      >
        添加新消息
      </button>
      <button
        onClick={() => {
          mutateRevoke();
        }}
      >
        撤回已有的第七条消息
      </button>
    </div>
  );
};
