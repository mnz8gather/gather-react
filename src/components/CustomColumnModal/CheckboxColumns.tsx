import { Checkbox, Row, Col } from "antd";
import { useSafeState } from "ahooks";
import { diffStringArray } from "./utils";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { CustomGroupColumns, ColumnsMap } from "./types";
import styles from "./CheckboxColumns.less";

interface CheckboxColumnsProps {
  columns: CustomGroupColumns[];
  current: CustomGroupColumns["member"];
  setCurrent: React.Dispatch<
    React.SetStateAction<CustomGroupColumns["member"]>
  >;
  allColumnsMap: ColumnsMap;
}

const SingleGroup = (
  props: CheckboxColumnsProps & { ele: CustomGroupColumns }
) => {
  const { ele, current, setCurrent, allColumnsMap } = props;

  const [, setChecked] = useSafeState<CheckboxValueType[]>(
    // 初始化赋值，防止 prevChecked === [] 产生 diff 错误
    ele.member
      .filter((item) =>
        current.map((citem) => citem.value).includes(item.value)
      )
      .map((pitem) => pitem.value)
  );

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setChecked((prevChecked) => {
      const [flag, value] = diffStringArray(
        prevChecked as string[],
        checkedValues as string[]
      );

      if (flag) {
        // add
        setCurrent((prevItems) => [...prevItems, allColumnsMap[value]]);
      } else {
        // remove
        setCurrent((prevItems) =>
          prevItems.filter((ele) => ele.value !== value)
        );
      }
      return checkedValues;
    });
  };

  return (
    <div className={styles["column-group"]}>
      <div className={styles["column-group-title"]}>{ele.groupLabel}</div>
      <Checkbox.Group
        value={current.map((cele) => cele.value)}
        onChange={onChange}
        style={{ width: "100%" }}
      >
        <Row>
          {ele.member.map((item) => (
            <Col key={item.value} span={8}>
              <Checkbox value={item.value} style={{ lineHeight: "32px" }}>
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
