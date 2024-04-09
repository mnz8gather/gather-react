import axios from 'axios';
import { Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import InternalMark from './Internal';
import type { InternalMarkProps } from './Internal';
import type { Marks } from './interface';

type MarkNormalProps = Omit<InternalMarkProps, 'mode'>;

function MarkNormal(props: MarkNormalProps) {
  // 获取 label list
  const { data: marks, loading } = useRequest<{ data: Marks }, unknown[]>(() => axios('/mock/person-info/key-person/label/list'));

  return (
    <>
      {loading && <Skeleton />}
      {!loading && <InternalMark {...props} mode='normal' marks={marks?.data} />}
    </>
  );
}

export default MarkNormal;
