import type { OverviewDataJSDoc } from './file_jsdoc';

/**
 * 引入 JavaScript 文件中 JSDoc 类型
 */
const overviewData: OverviewDataJSDoc = { rate: 66.6, total: '100' };

/**
 * TypeScript 函数示例
 *
 * @param arr 数组
 * @param ele 数组中的元素
 * @returns 删除后的数组
 */
function arrayDelete<T>(arr: T[], ele: T): T[] {
  return arr.filter((value) => value !== ele);
}

interface DataNode {
  /** 子节点 */
  children?: DataNode[];
}

type TreeData = DataNode[];

interface Decide {
  (node?: DataNode): boolean;
}

/**
 * 另一个函数示例
 *
 * @param tree 树
 * @param decide 判断函数
 * @returns 查找结果
 */
function depthFirstFind(tree: TreeData, decide: Decide): boolean {
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
