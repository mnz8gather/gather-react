// 模块化
export {};

interface GeneralResponse<T> {
  code: number;
  desc?: string;
  data: T;
}

// 接口数据可信的前提
interface Dragon {
  name: string;
}
