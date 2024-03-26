import ChatBubble from '@/components/pure.ChatBubble';
import GeneralContainer from '@/components/layout.GeneralContainer';
import GeneralHeader from '@/components/layout.GeneralHeader';

export default () => {
  return (
    <>
      <GeneralHeader>聊天气泡</GeneralHeader>
      <GeneralContainer>
        <div style={{ padding: '20px' }}>
          <ChatBubble content='say something' />
        </div>
        <div style={{ padding: '20px' }}>
          <ChatBubble content='say something' placement='left' />
        </div>
      </GeneralContainer>
    </>
  );
};
