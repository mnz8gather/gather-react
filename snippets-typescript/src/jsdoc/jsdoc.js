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
