import { Skeleton } from 'antd';
import Icon from '@ant-design/icons';
import { useBoolean, useRequest, useSafeState, useUpdateEffect } from 'ahooks';
import InternalMark from './Internal';
import EditSvg from './svg-edit';
import { video_label } from '@/services/videoInfo';
import type { InternalMarkProps } from './Internal';

type MarkEditableProps = Omit<InternalMarkProps, 'mode'>;

function MarkEditable(props: MarkEditableProps) {
  const { value, onChange, ...rest } = props;
  // 获取 label list
  const { data: marks, loading, refresh } = useRequest(video_label);
  // 记录 编辑状态已有数据
  const [cache, setCache] = useSafeState(value);
  // 编辑状态
  const [internal_editing, { toggle }] = useBoolean();

  const edit_button = (
    <div onClick={toggle} style={{ cursor: 'pointer', userSelect: 'none', height: '24px' }}>
      <Icon component={EditSvg} style={{ marginRight: '10px' }} />
      <span style={{ color: '#3B86FF', fontSize: '16px' }}>{internal_editing ? '结束编辑' : '编辑标签'}</span>
    </div>
  );

  useUpdateEffect(() => {
    onChange?.(cache);
  }, [cache]);

  return (
    <>
      {loading && <Skeleton />}
      {!loading && (
        <InternalMark
          {...rest}
          mode='editable'
          marks={marks?.result}
          value={cache}
          onChange={(nu) => {
            setCache(nu);
          }}
          internal_editing={internal_editing}
          editingButton={edit_button}
          afterCreateSuccess={refresh}
          afterDeleteSuccess={(label_key) => {
            if (label_key) {
              // 清除被删选项
              setCache((prev) => prev?.filter((ele) => ele !== label_key));
            }
            refresh();
          }}
        />
      )}
    </>
  );
}

export default MarkEditable;
