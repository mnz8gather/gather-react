/**
 * 引入 TypeScript 文件中的类型
 *
 * @typedef {import('./file_ts').OverviewDataTS} OverviewDataRename
 * @type {OverviewDataRename}
 */
const overviewData = { rate: 66.6, total: '100' };

/**
 * JSDoc 函数示例
 *
 * @template T
 * @param {T[]} arr 数组
 * @param {T} ele 数组中的元素
 * @returns {T[]} 删除后的数组
 */
function arrayDelete(arr, ele) {
  return arr.filter((value) => value !== ele);
}

/**
 * 另一个函数示例
 *
 * @typedef {{children?: DataNode[]}} DataNode
 * @typedef {DataNode[]} TreeData
 * @param {TreeData} tree 树
 * @param {(node?: DataNode) => boolean} decide 判断函数
 * @returns {boolean} 查找结果
 */
function depthFirstFind(tree, decide) {
  if (tree) {
    let stack = [...tree];

    while (stack.length > 0) {
      let currentNode = stack.pop();
      const result = decide(currentNode);
      if (result) {
        return result;
      }
      if (currentNode?.children) {
        for (let i = currentNode.children.length - 1; i >= 0; i -= 1) {
          stack.push(currentNode.children[i]);
        }
      }
    }
  }
  return false;
}

/**
 * 确保模块化
 *
 * https://www.typescriptlang.org/docs/handbook/2/modules.html
 * 在 TypeScript 中，与 ECMAScript 2015 一样，任何包含顶级 `import` 或 `export` 的文件都被视为模块。
 * 相反，如果一个文件没有任何顶级的 `import` 或 `export` 声明，它会被视为脚本，其内容可在全局作用域中使用（因此也可以被模块访问）。
 */
export {};
