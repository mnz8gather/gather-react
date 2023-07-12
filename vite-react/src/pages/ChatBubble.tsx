import ChatBubble from '@/alpha/ChatBubble';
import GeneralContainer from '@/layouts/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <div style={{ padding: '20px' }}>
        <ChatBubble content='say something' />
      </div>
      <div style={{ padding: '20px' }}>
        <ChatBubble content='say something' placement='left' />
      </div>
    </GeneralContainer>
  );
};
