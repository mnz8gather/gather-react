function BFS<T extends Partial<Record<ChildFieldName, T[]>>, ChildFieldName extends string = 'children'>(
  root: T | T[],
  callback: (r: T) => void,
  childFieldName: ChildFieldName = 'children' as ChildFieldName
) {
  let queue: T[] = [];

  if (Array.isArray(root)) {
    queue = queue.concat(root);
  } else {
    queue.push(root);
  }

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode !== undefined) {
      callback(currentNode);
      const children = currentNode[childFieldName];
      if (Array.isArray(children)) {
        queue = queue.concat(children);
      }
    }
  }
}

// function DFS(callback, node = this.root) {
//   callback(node);
//   for (const child of node.children) {
//     this.depthFirstSearch(callback, child);
//   }
// }

// function DFSSW<T extends Partial<Record<ChildFieldName, T>>, ChildFieldName extends string = 'children'>(root: T | T[], callback: (r: T) => void) {
//   let stack: T[] = [];
//   if (Array.isArray(root)) {
//     stack = stack.concat(root);
//   } else {
//     stack.push(root);
//   }

//   while (stack.length > 0) {
//     let currentNode = stack.pop();
//     callback(currentNode);

//     for (let i = currentNode?.children?.length - 1; i >= 0; i -= 1) {
//       stack.push(currentNode?.children[i]);
//     }

//   }
// }
