import { Tag } from 'antd';

interface MarkPreviewProps {
  labels?: React.Key[];
  marks?: Marks;
}

function MarkPreview(props: MarkPreviewProps) {
  const { labels, marks } = props;

  let sigma: { [x: string]: { name: string; member: { key: React.Key; name: string }[] } } = {};

  if (labels && labels?.length > 0) {
    marks?.forEach?.((p_ele) => {
      const p_ele_member = p_ele?.member;

      p_ele_member?.forEach?.((p_ele2) => {
        if (labels.includes(p_ele2?.label_value)) {
          if (sigma?.[p_ele.category_key]) {
            sigma[p_ele.category_key].member.push({ key: p_ele2.label_value, name: p_ele2.label_name });
          } else {
            sigma[p_ele.category_key] = {
              name: p_ele.category_name,
              member: [
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
        {Object.entries(sigma)?.map(([c_key, { name: c_name, member }]) => {
          return (
            <div key={c_key} style={{ paddingTop: '16px' }}>
              <div>{c_name}</div>
              <div style={{ paddingTop: '8px', display: 'flex', flexWrap: 'wrap', rowGap: '8px' }}>
                {member.map(({ key: l_key, name: l_name }) => {
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
