/**
 * 从从第三方库 antd/es/input/Input 中引入 InputProps 并定义为 AntdInputProps 类型
 *
 * @typedef {import('antd/es/input/Input').InputProps} AntdInputProps
 * @type {AntdInputProps}
 */
const ANTD_INPUT_PROPS = {};

/**
 * 从第三方库引用，直接使用
 *
 * @type {import('antd').FormItemProps}
 */
const ANTD_FORM_ITEM_DEFAULT_PROPS = {};

/**
 * link 链接标签
 *
 * 这是一个内部链接 {@link ANTD_INPUT_PROPS}
 */
const internalLink = '';

/**
 * 替换掉显示文本
 *
 * {@link ANTD_INPUT_PROPS 替换 ANTD_INPUT_PROPS 的显示文本}
 */
const dispalyLink = '';

/**
 * see 参见标签
 *
 * @see {@link https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key React Docs}
 */
const doc = '';

// ==================================== overload ====================================
// VS Code 的 TypeScript 语言服务器在解析 JSDoc 时，支持 @overload 来明确定义函数重载。
// TypeScript 的 JSDoc 解析要求函数有一个“默认”签名（不带 @overload 的 JSDoc 块）来定义函数的整体类型。
// 如果只有 @overload 签名而没有默认签名，TypeScript 可能会认为函数参数未定义类型，从而导致 any 类型错误。
// 最后的 JSDoc 块（不带 @overload）定义了函数的“实现签名”，它需要足够宽泛以涵盖所有 @overload 签名的情况。

/**
 * 计算两个数的和或连接字符串。
 * @overload
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 返回两个数字的和
 */
/**
 * @overload
 * @param {string} a - 第一个字符串
 * @param {string} b - 第二个字符串
 * @returns {string} 返回连接后的字符串
 */
/**
 * @param {number|string} a - 数字或字符串
 * @param {number|string} b - 数字或字符串
 * @returns {number|string|undefined} 返回数字的和、连接的字符串或 undefined
 */
function add(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  // 显式返回 undefined
  return undefined;
}

/**
 * 获取数组中的元素或子数组。
 * @overload
 * @param {Array<any>} arr - 输入数组
 * @param {number} index - 索引
 * @returns {*} 返回索引处的元素
 *
 * @overload
 * @param {Array<any>} arr - 输入数组
 * @param {number} start - 起始索引
 * @param {number} end - 结束索引
 * @returns {Array<any>} 返回子数组
 *
 * @param {Array<any>} arr - 输入数组
 * @param {number} start - 起始索引
 * @param {undefined|number} end - 结束索引
 * @returns {Array<any>|any} 返回子数组
 */
function get(arr, start, end) {
  if (end === undefined) {
    return arr[start];
  }
  return arr.slice(start, end);
}

/**
 * @overload
 * @param {string} name
 * @param {string} [greeting]
 * @param {boolean} [split] 重载的地方
 * @returns {string}
 *
 * @overload
 * @param {string} name
 * @param {string} [greeting]
 * @param {true} split 重载的地方
 * @returns {[string, string]}
 *
 * @param {string} name
 * @param {string} [greeting]
 * @param {boolean} [split]
 * @returns {string | [string, string] | undefined}
 */
function greet(name, greeting = 'Hello', split) {
  if (typeof name === 'string') {
    if (split) {
      return [greeting, name];
    }
    return `${greeting}, ${name}!`;
  }
  return undefined;
}
greet('1', '2', true);

/**
 * 还需要处理
 * 箭头函数重载
 * @type {{
 * (width: number): number;
 * (width: number, height: number): number;
 * }}
 */
const calculateArea = (width, height = width) => {
  if (typeof height === 'number') {
    return width * height;
  }
  return width * width;
};
calculateArea(1, 2);
// ==================================================================================
