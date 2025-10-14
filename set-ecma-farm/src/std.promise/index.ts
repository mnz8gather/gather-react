class MyPromise {
  // Promise 状态和值
  #state = "pending"; // 状态：pending, fulfilled, rejected
  #value = null; // 成功的值或失败的原因
  #fulfilledCallbacks = []; // 存储 onFulfilled 回调
  #rejectedCallbacks = []; // 存储 onRejected 回调

  constructor(executor) {
    // 立即执行 executor 函数
    try {
      executor(
        (value) => this.#resolve(value), // resolve 方法
        (reason) => this.#reject(reason) // reject 方法
      );
    } catch (error) {
      this.#reject(error); // 捕获 executor 中的同步错误
    }
  }

  // resolve 方法：处理 Promise 决议
  #resolve(value) {
    if (this.#state !== "pending") return; // 状态不可变
    this.#state = "fulfilled";
    this.#value = value;

    // 异步执行所有 onFulfilled 回调
    queueMicrotask(() => {
      this.#fulfilledCallbacks.forEach((callback) => {
        try {
          callback(this.#value);
        } catch (error) {
          // 忽略回调中的错误（不影响其他回调）
        }
      });
    });
  }

  // reject 方法：处理 Promise 拒绝
  #reject(reason) {
    if (this.#state !== "pending") return; // 状态不可变
    this.#state = "rejected";
    this.#value = reason;

    // 异步执行所有 onRejected 回调
    queueMicrotask(() => {
      this.#rejectedCallbacks.forEach((callback) => {
        try {
          callback(this.#value);
        } catch (error) {
          // 忽略回调中的错误
        }
      });
    });
  }

  // then 方法：符合 Promise/A+ 规范
  then(onFulfilled, onRejected) {
    // 返回一个新的 Promise
    return new MyPromise((resolve, reject) => {
      // 包装回调，确保异步执行和错误处理
      const handleCallback = (callback, value) => {
        try {
          // 如果回调不是函数，直接传递值（值穿透）
          if (typeof callback !== "function") {
            return this.#state === "fulfilled" ? resolve(value) : reject(value);
          }
          // 执行回调，处理返回值
          const result = callback(value);
          // 处理 thenable 对象或 Promise
          if (result && typeof result.then === "function") {
            result.then(
              (val) => resolve(val),
              (err) => reject(err)
            );
          } else {
            resolve(result); // 普通值直接决议
          }
        } catch (error) {
          reject(error); // 捕获回调中的异常
        }
      };

      // 根据当前状态处理
      if (this.#state === "pending") {
        // 如果是 pending 状态，存储回调
        if (typeof onFulfilled === "function") {
          this.#fulfilledCallbacks.push((value) =>
            handleCallback(onFulfilled, value)
          );
        } else {
          this.#fulfilledCallbacks.push((value) => resolve(value));
        }
        if (typeof onRejected === "function") {
          this.#rejectedCallbacks.push((reason) =>
            handleCallback(onRejected, reason)
          );
        } else {
          this.#rejectedCallbacks.push((reason) => reject(reason));
        }
      } else if (this.#state === "fulfilled") {
        // 如果已 fulfilled，异步调用 onFulfilled
        queueMicrotask(() => handleCallback(onFulfilled, this.#value));
      } else if (this.#state === "rejected") {
        // 如果已 rejected，异步调用 onRejected
        queueMicrotask(() => handleCallback(onRejected, this.#value));
      }
    });
  }

  // 辅助方法：实现 catch
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // 辅助方法：实现 finally
  finally(onFinally) {
    return this.then(
      (value) =>
        MyPromise.resolve(
          typeof onFinally === "function" ? onFinally() : undefined
        ).then(() => value),
      (reason) =>
        MyPromise.resolve(
          typeof onFinally === "function" ? onFinally() : undefined
        ).then(() => {
          throw reason;
        })
    );
  }

  // 静态方法：Promise.resolve
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  // 静态方法：Promise.reject
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
}

// 测试同步决议
const p1 = new MyPromise((resolve) => resolve("成功"));
p1.then((value) => console.log(value)); // 输出: 成功

// 测试异步决议
const p2 = new MyPromise((resolve) =>
  setTimeout(() => resolve("异步成功"), 1000)
);
p2.then((value) => console.log(value)); // 1秒后输出: 异步成功

// 测试错误处理
const p3 = new MyPromise((resolve, reject) => reject("错误"));
p3.catch((reason) => console.log(reason)); // 输出: 错误

// 测试链式调用
const p4 = new MyPromise((resolve) => resolve(1))
  .then((value) => value + 1)
  .then((value) => console.log(value)); // 输出: 2

// 测试值穿透
const p5 = new MyPromise((resolve) => resolve(42)).then();
p5.then((value) => console.log(value)); // 输出: 42

// 测试 thenable 对象
const thenable = { then: (resolve) => resolve("thenable 值") };
const p6 = new MyPromise((resolve) => resolve(thenable));
p6.then((value) => console.log(value)); // 输出: thenable 值
