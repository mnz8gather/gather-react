import ChatBubble from '@/alpha/ChatBubble';
import GeneralContainer from '@/layouts/GeneralContainer';
import GeneralHeader from '@/layouts/GeneralHeader';

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
