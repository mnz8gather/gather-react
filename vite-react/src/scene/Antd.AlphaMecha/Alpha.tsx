import { useEffect } from 'react';
import { useRequest, useSafeState } from 'ahooks';
import { List } from 'antd';
import { alpha_list } from '@/services/alpha';

interface AlphaProps {
  someCode?: string;
}

function Alpha(props: AlphaProps) {
  const { someCode } = props;

  // 分页参数
  const [pageInfo, setPageInfo] = useSafeState({ page: 1, size: 10 });

  // const { data: alpha_list_data, loading } = useRequest(() => alpha_list({ someCode, ...pageInfo }), { refreshDeps: [pageInfo] });

  useEffect(() => {
    let ignore = false;
    console.log('ignore', ignore);
    if (!ignore) {
      alpha_list({ someCode, ...pageInfo }).then(() => {
        console.log('then ignore', ignore);
      });
    }
    return () => {
      ignore = true;
    };
  }, [someCode, pageInfo]);

  return (
    <List
      // loading={loading}
      // dataSource={alpha_list_data?.result}
      // renderItem={(item) => {
      //   console.log(item);
      //   return <div style={{ padding: '16px 24px 0' }}>{item?.title}</div>;
      // }}
      pagination={{
        position: 'bottom',
        onChange: (page, size) => {
          setPageInfo({ page, size });
        },
        current: pageInfo.page,
        pageSize: pageInfo.size,
        // total: alpha_list_data?.total,
      }}
    />
  );
}

export default Alpha;
