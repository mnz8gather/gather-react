// 定义类型 FunctionComponentExtra
// FunctionComponentExtra 中 a b 为 string 类型, c 为可选的 string 类型
// @component 声明为组件类型
// 参数为 props, prop 类型为 React.HTMLProps<HTMLSpanElement> & FunctionComponentExtra
// 返回 React.ReactElement 类型

/**
 *
 * @typedef {Object} FunctionComponentExtra
 * @property {string} fcS
 * @property {number} fcN
 * @property {boolean} fcB
 * @property {string} [fcU]
 *
 * @component
 * @param {React.HTMLProps<HTMLSpanElement> & FunctionComponentExtra} props
 *
 * @returns {React.ReactElement}
 *
 */
function FunctionComponent(props) {
  const { fcS, fcN, fcB, fcU, ...spanProps } = props;
  return (
    <div>
      <div>{fcS}</div>
      <span {...spanProps} />
    </div>
  );
}

// ----------------------------------------------------------------------------------
// 可以拆开写
/**
 * @typedef {Object} FunctionComponentAnotherWayExtra
 * @property {string} fcS
 * @property {boolean} fcB
 */

// 这个不能在拆开，这是一个完整的类型
/**
 * @component
 * @param {React.HTMLProps<HTMLSpanElement> & FunctionComponentAnotherWayExtra} props
 *
 * @returns {React.ReactElement}
 */

// 另一种写法，可以将类型拆开
function FunctionComponentAnotherWay(props) {
  const { fcS, ...spanProps } = props;
  return (
    <div>
      <div>{fcS}</div>
      <span {...spanProps} />
    </div>
  );
}

export { FunctionComponent, FunctionComponentAnotherWay };
