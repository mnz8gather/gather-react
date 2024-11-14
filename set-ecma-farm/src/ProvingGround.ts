const arr = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
];

// 方法1: Object.fromEntries + map
const map1 = new Map(arr.map((item) => [item.id, item]));

// 方法2: 更简短的 reduce (箭头函数简写)
const map2 = arr.reduce((m, item) => m.set(item.id, item), new Map());

// id -> name 的映射
const map3 = new Map(arr.map(({ id, name }) => [id, name]));

// 个人建议使用第一种 new Map(arr.map()) 的写法:
// 代码更直观易读
// 性能上差异不大
// 可以方便地解构和转换数据
// 这些方法都是一行代码就能完成转换,比原来的写法更简洁。选择哪种主要看你的具体使用场景和个人代码风格偏好。

// 方法1: Object.fromEntries + map (最推荐)
const obj1 = Object.fromEntries(arr.map((item) => [item.id, item]));

// 方法2: reduce
const obj2 = arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// 方法3: 如果只需要 id -> name 的映射
const obj3 = Object.fromEntries(arr.map(({ id, name }) => [id, name]));

// 最推荐使用第一种 Object.fromEntries 的方法：
// 代码最清晰易读
// 性能较好
// 是 ES10 (ES2019) 标准方法
// 不需要使用展开运算符，内存效率更高
// 注意：使用对象作为数据结构时，键会被自动转换为字符串类型。如果这点不符合需求，建议使用前面提到的 Map 结构。
