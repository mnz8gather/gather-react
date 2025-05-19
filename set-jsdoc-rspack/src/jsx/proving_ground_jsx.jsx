/**
 * 组件 JSDoc 示例
 *
 * 只定义组件的 props 即可，其他来自类型推导
 *
 * @typedef {Object} ExtraProps
 * @property {string} str 字段的说明
 * @property {number} num
 * @property {boolean} bool
 * @property {string} [optionalStr]
 *
 * @param {React.HTMLProps<HTMLSpanElement> & ExtraProps} props
 */
export function FunctionComponent(props) {
  const { str, num, bool, optionalStr, ...spanProps } = props;
  return (
    <div>
      <div>{str}</div>
      <span {...spanProps} />
    </div>
  );
}

/**
 * 不定义直接写
 *
 * @param {Object} props
 * @param {Record<string, any>} [props.obj]
 */
function Direct({ obj }) {
  return <></>;
}

/**
 * 分开定义
 *
 * @typedef {Object} AnotherExtraProps
 * @property {string} str 字段的说明
 * @property {boolean} bool
 */

/**
 * @param {React.HTMLProps<HTMLSpanElement> & AnotherExtraProps} props
 */
export function SplitWay(props) {
  const { str, ...spanProps } = props;
  return (
    <div>
      <div>{str}</div>
      <span {...spanProps} />
    </div>
  );
}
