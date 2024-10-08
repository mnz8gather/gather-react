// 确保模块化
export {};

/**
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
 * A value which uniquely identifies a node among items in an array.
 * @see {@link https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key React Docs}
 */
const dispalyReactKey = '';

/**
 * {@link dispalyReactKey} 这是一个内部链接
 */
const dispalyLinkInternal = '';
