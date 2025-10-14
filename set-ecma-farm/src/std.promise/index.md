## Promise A+

[Promise A+ Reference](https://github.com/promises-aplus)

## 验证 Promise A+ 规范

### 使用 promises-aplus-tests 测试套件验证 实现 的符合性

```
adapter.js
npx promises-aplus-tests adapter.js
```

```
const MyPromise = require('./my-promise');
module.exports = {
  resolved: (value) => MyPromise.resolve(value),
  rejected: (reason) => MyPromise.reject(reason),
  deferred: () => {
    let resolve, reject;
    const promise = new MyPromise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  },
};
```

### 使用 promises-aplus-tests 测试套件验证原生 ES Promise 的符合性

```
const adapter = {
  resolved: (value) => Promise.resolve(value),
  rejected: (reason) => Promise.reject(reason),
  deferred: () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  },
};
module.exports = adapter;
```
