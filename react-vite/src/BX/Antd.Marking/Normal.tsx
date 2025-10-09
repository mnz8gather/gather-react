import { Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import InternalMark from './Internal';
import { video_label } from '@/services/videoInfo';
import type { InternalMarkProps } from './Internal';

type MarkNormalProps = Omit<InternalMarkProps, 'mode'>;

function MarkNormal(props: MarkNormalProps) {
  // 获取 label list
  const { data: marks, loading } = useRequest(video_label);

  return (
    <>
      {loading && <Skeleton />}
      {!loading && <InternalMark {...props} mode='normal' marks={marks?.result} />}
    </>
  );
}

export default MarkNormal;
