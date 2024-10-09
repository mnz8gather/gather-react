// 模块化
export {};

interface GeneralResponse<T> {
  code?: number;
  desc?: string;
  data?: T;
}

// 接口数据不可信的前提
interface Dragon {
  name?: string;
}

// 页面需要的数据多于接口
interface FEDragon extends Dragon {
  tag?: string;
}
