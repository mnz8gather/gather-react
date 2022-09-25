import { useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import { useSafeState } from 'ahooks';
import { diffStringArray } from './utils';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CustomGroupColumns, ColumnsMap } from './types';
import styles from './CheckboxColumns.less';

interface CheckboxColumnsProps {
  columns: CustomGroupColumns[];
  current: CustomGroupColumns['member'];
  setCurrent: React.Dispatch<React.SetStateAction<CustomGroupColumns['member']>>;
  allColumnsMap: ColumnsMap;
}

const SingleGroup = (props: CheckboxColumnsProps & { ele: CustomGroupColumns }) => {
  const { ele, current, setCurrent, allColumnsMap } = props;

  const [, setChecked] = useSafeState<CheckboxValueType[]>([]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setChecked((prevChecked) => {
      const [checked, changed] = diffStringArray(prevChecked as string[], checkedValues as string[]);

      if (checked) {
        // add
        setCurrent((prevItems) => [...prevItems, allColumnsMap[changed]]);
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
    setChecked(ele.member.filter((item) => current.map((citem) => citem.value).includes(item.value)).map((pitem) => pitem.value));
  }, [current, ele, setChecked]);

  return (
    <div className={styles['column-group']}>
      <div className={styles['column-group-title']}>{ele.groupLabel}</div>
      <Checkbox.Group value={current.map((cele) => cele.value)} onChange={onChange} style={{ width: '100%' }}>
        <Row>
          {ele.member.map((item) => (
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

const CheckboxColumns = (props: CheckboxColumnsProps) => {
  const { columns } = props;

  return (
    <>
      {columns.map((ele) => (
        <SingleGroup key={ele.groupLabel} ele={ele} {...props} />
      ))}
    </>
  );
};

export default CheckboxColumns;
