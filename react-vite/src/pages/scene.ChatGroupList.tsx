import { ChatGroupList } from '@/scene/Antd.ChatGroupList';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { GeneralHeader } from '@/shared/GeneralHeader';

export default () => {
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

  const list = [
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    {
      name: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',
      lastMessage: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',
      url,
    },
    {
      name: '小鸡岛',
      lastMessage: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',
      url,
    },
    {
      name: '小鸡岛',
      lastMessage: '哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或',
      url,
    },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
    { name: '暗影刺客', lastMessage: '刺杀首领', url },
  ];

  return (
    <>
      <GeneralHeader>群组列表</GeneralHeader>
      <GeneralContainer style={{ height: '400px', width: '400px', margin: '30px auto 0' }}>
        <ChatGroupList data={list} />
      </GeneralContainer>
    </>
  );
};
