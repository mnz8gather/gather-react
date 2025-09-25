class Aoo {
  constructor(run: () => void, go: () => void) {
    run();
    go();
  }
}

/**
 * this 默认指向类的实例
 * 但是，如果将实例的这个方法提取出来单独使用，
 * this 会指向该方法运行时所在的环境
 * （由于 class 内部是严格模式，所以 this 实际指向的是 undefined ）
 * 在类的内部使用 this.method 将 method 作为参数传递，
 * method 不是箭头函数方式且 method 内也使用 this 也会出现 this 指向问题
 */
class Boo {
  /* private readonly */ _no: number;
  constructor(no: number) {
    this._no = no;
    // 第一个参数使用 内联箭头函数方式
    new Aoo(() => {
      this.run();
    }, this.go);
  }

  public run(): void {
    console.debug("run:", this._no);
  }

  // 箭头函数方式
  public go = (): void => {
    console.debug("go:", this._no);
  };
}

const boo = new Boo(1);

boo._no = 2;

boo.run();
boo.go();

// 将实例的这个方法提取出来单独使用 会出现 this 指向问题
const booRun = boo.run;
// booGo 使用箭头函数所以不会报错
const { go: booGo } = boo;

// booRun 报错
// booRun();
booGo();

// 当一个属性被声明为 readonly 时，它意味着这个属性只能在两个地方被赋值：
class ReadonlyA {
  // 声明时初始化
  readonly myProp: string = "initial value";
  constructor(value: string) {
    // 类的构造函数 (constructor) 中赋值
    this.myProp = value;
  }
}
