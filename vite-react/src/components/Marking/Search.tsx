import axios from 'axios';
import { Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import InternalMark from './Internal';
import type { InternalMarkProps } from './Internal';
import type { Marks } from './interface';

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
  const { data: marks, loading } = useRequest<{ data: Marks }, unknown[]>(() => axios('/mock/person-info/key-person/label/list'));

  return (
    <>
      {loading && <Skeleton />}
      {!loading && <InternalMark {...props} mode='search' marks={marks?.data} />}
    </>
  );
};

export default MarkSearch;
