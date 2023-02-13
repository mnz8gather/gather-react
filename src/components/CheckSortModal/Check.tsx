import { useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import { useSafeState } from 'ahooks';
import { diffStringArray } from './utils';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { Group, ItemsMap } from './types';
import styles from './Check.less';

interface CheckProps {
  current: Group['member'];
  setCurrent: React.Dispatch<React.SetStateAction<Group['member']>>;
  allGroups: Group[];
  allItemsMap: ItemsMap;
}

const SingleGroup = (props: CheckProps & { group: Group }) => {
  const { current, setCurrent, allItemsMap, group } = props;

  const [, setChecked] = useSafeState<CheckboxValueType[]>([]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setChecked((prevChecked) => {
      const [checked, changed] = diffStringArray(prevChecked as string[], checkedValues as string[]);

      if (checked) {
        // add
        setCurrent((prevItems) => [...prevItems, allItemsMap[changed]]);
      } else {
        // remove
        setCurrent((prevItems) => prevItems.filter((item) => item.value !== changed));
      }
      return checkedValues;
    });
  };

  useEffect(() => {
    /**
     * 建立 setChecked 中 prevChecked 与 current 关联，解决数据不一致产生的错误。
     */
    setChecked(group.member.filter((item) => current.map((citem) => citem.value).includes(item.value)).map((pitem) => pitem.value));
  }, [current, group, setChecked]);

  return (
    <div className={styles['single-group']}>
      <div className={styles['single-group-title']}>{group.groupLabel}</div>
      <Checkbox.Group value={current.map((cele) => cele.value)} onChange={onChange} style={{ width: '100%' }}>
        <Row>
          {group.member.map((item) => (
            <Col key={item.value} span={8}>
              <Checkbox value={item.value} style={{ lineHeight: '32px' }}>
                {item.label}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

const Check = (props: CheckProps) => {
  const { allGroups } = props;

  return (
    <>
      {allGroups.map((group) => (
        <SingleGroup key={group.groupLabel} group={group} {...props} />
      ))}
    </>
  );
};

export default Check;
