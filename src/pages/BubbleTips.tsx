import BubbleTips from '@/examples/BubbleTips';

export default () => {
  return (
    <>
      <BubbleTips tipType="level" tipIndex={1}>
        <span>{1}级</span>
      </BubbleTips>
      <br />
      <br />
      <br />
      <BubbleTips tipType="type" tipIndex={1}>
        <span>{1}类</span>
      </BubbleTips>
    </>
  );
};
