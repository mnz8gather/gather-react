import { ChatBubble } from '@/components';

export default () => {
  return (
    <>
      <div style={{ padding: '20px' }}>
        <ChatBubble content='say something' />
      </div>
      <div style={{ padding: '20px' }}>
        <ChatBubble content='say something' placement='left' />
      </div>
    </>
  );
};
