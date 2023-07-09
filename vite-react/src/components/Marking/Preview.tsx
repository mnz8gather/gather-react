import { Tag } from 'antd';
import type { Marks } from './interface';

interface MarkPreviewProps {
  labels?: React.Key[];
  marks?: Marks;
}

function MarkPreview(props: MarkPreviewProps) {
  const { labels, marks } = props;

  const sigma: { [x: string]: { name: string; members: { key: React.Key; name: string }[] } } = {};

  if (labels && labels?.length > 0) {
    marks?.forEach?.((p_ele) => {
      const p_ele_members = p_ele?.members;

      p_ele_members?.forEach?.((p_ele2) => {
        if (labels.includes(p_ele2?.label_value)) {
          if (sigma?.[p_ele.category_key]) {
            sigma[p_ele.category_key].members.push({ key: p_ele2.label_value, name: p_ele2.label_name });
          } else {
            sigma[p_ele.category_key] = {
              name: p_ele.category_name,
              members: [
                {
                  key: p_ele2.label_value,
                  name: p_ele2.label_name,
                },
              ],
            };
          }
        }
      });
    });

    return (
      <div>
        {Object.entries(sigma)?.map(([c_key, { name: c_name, members }]) => {
          return (
            <div key={c_key} style={{ paddingTop: '16px' }}>
              <div>{c_name}</div>
              <div style={{ paddingTop: '8px', display: 'flex', flexWrap: 'wrap', rowGap: '8px' }}>
                {members.map(({ key: l_key, name: l_name }) => {
                  return (
                    <Tag key={l_key} style={preview_label_style}>
                      {l_name}
                    </Tag>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <></>;
}

export default MarkPreview;

const preview_label_style: React.CSSProperties = {
  color: '#4E5B66',
  background: '#F3F7FD',
  border: '1px solid #B6C2D0',
  borderRadius: '2px',
  padding: '0px 4px',
  minHeight: '22px',
  wordBreak: 'break-all',
  whiteSpace: 'normal',
};
