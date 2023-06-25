import { ChatList } from '@/examples';

export default () => {
  const data = [
    { id: '56890', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '34534', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56678', content: '7890', account: 'mei13', type: 'normal', nickname: '梅十三' },
    { id: '56567', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56456', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56345', content: '7890', account: 'mei13', type: 'normal', nickname: '梅十三' },
    { id: '56234', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56123', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '45676', content: '7890', account: 'mei13', type: 'normal', nickname: '梅十三' },
    { id: '56778', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56767', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56756', content: '7890', account: 'mei13', type: 'normal', nickname: '梅十三' },
    { id: '56745', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56734', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56723', content: '7890', account: 'mei13', type: 'normal', nickname: '五六七' },
    { id: '56712', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56791', content: '7890', account: 'mei13', type: 'normal', nickname: '梅十三' },
    { id: '56790', content: '1234', account: '567', type: 'normal', nickname: '五六七' },
    { id: '56789', content: '创建聊天', account: '567', type: 'notice', nickname: '五六七' },
  ];

  return (
    <>
      <ChatList data={data} currentAccount='567' />
    </>
  );
};
