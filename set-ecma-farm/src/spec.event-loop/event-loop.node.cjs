// node v22.20.0
// 必须得是 cjs 才符合预期结果

console.log("同步代码开始");

// 微任务示例
// 1. process.nextTick (Node.js 专属，高优先级)
process.nextTick(() => {
  console.log("微任务: process.nextTick");
});

// 2. queueMicrotask
queueMicrotask(() => {
  console.log("微任务: queueMicrotask");
});

// 3. Promise.then
Promise.resolve().then(() => {
  console.log("微任务: Promise.then");
});

// 宏任务示例
// 1. setTimeout
setTimeout(() => {
  console.log("宏任务: setTimeout");
}, 0);

// 2. setInterval (只执行一次演示)
const intervalId = setInterval(() => {
  console.log("宏任务: setInterval");
  clearInterval(intervalId); // 停止重复
}, 0);

// 3. setImmediate (Node.js 专属)
setImmediate(() => {
  console.log("宏任务: setImmediate");
});

console.log("同步代码结束");
