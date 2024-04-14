import { Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import InternalMark from './Internal';
import { video_label } from '@/services/videoInfo';
import type { InternalMarkProps } from './Internal';

interface MarkSearchProps extends Omit<InternalMarkProps, 'mode'>, MarkSearchI {}

interface MarkSearchI {
  // 待定
  renderRerequest?: boolean;
}

/**
 * 多选，所有标签不存在关系
 */
const MarkSearch = (props: MarkSearchProps) => {
  // 获取 label list
  const { data: marks, loading } = useRequest(video_label);

  return (
    <>
      {loading && <Skeleton />}
      {!loading && <InternalMark {...props} mode='search' marks={marks?.result} />}
    </>
  );
};

export default MarkSearch;
