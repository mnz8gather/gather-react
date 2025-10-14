## 主线程

## 微任务队列

### queueMicrotask

ES2019 显式地将一个回调添加到微任务队列。

### Promise

Promise 的 .then .catch .finally 回调会被添加到微任务队列。

Promise.resolve() 或 Promise.reject() 可以快速创建一个已决议的 Promise，触发微任务。

### MutationObserver

2012 年左右出现，其回调函数在微任务队列中执行。

### process.nextTick nodejs

nodejs 环境

nextTick 队列，在当前执行栈的末尾，但在微任务队列之前执行。

nextTick 队列按加入顺序（FIFO，先入先出）执行。

## 宏任务队列

### setTimeout

### setInterval

### DOM 事件回调

### requestAnimationFrame

### MessageChannel

### setImmediate nodejs
