interface DataNode {
  children?: DataNode[];
}

type TreeData = DataNode[];

/**
 * @param tree 树
 * @param decide 判断函数
 * @returns 查找结果
 */
function depthFirstFind(tree: TreeData, decide: (node?: DataNode) => boolean): boolean {
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
