console.log("同步代码开始");

// 微任务示例
// 1. queueMicrotask
queueMicrotask(() => {
  console.log("微任务: queueMicrotask");
});

// 2. Promise.then
Promise.resolve().then(() => {
  console.log("微任务: Promise.then");
});

// 3. MutationObserver
const observer = new MutationObserver(() => {
  console.log("微任务: MutationObserver");
});
const element = document.createElement("div");
observer.observe(element, { attributes: true });
element.setAttribute("data-test", "value"); // 触发 MutationObserver

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

// 3. DOM 事件 (模拟点击事件，需要手动触发或自动化)
const button = document.createElement("button");
button.textContent = "Click me";
button.addEventListener("click", () => {
  console.log("宏任务: DOM click event");
});
document.body.appendChild(button); // 添加到页面，需手动点击触发

// 4. requestAnimationFrame
requestAnimationFrame(() => {
  console.log("宏任务: requestAnimationFrame");
});

// 5. MessageChannel
const channel = new MessageChannel();
channel.port1.onmessage = () => {
  console.log("宏任务: MessageChannel");
};
channel.port2.postMessage(null);

console.log("同步代码结束");

export {};
