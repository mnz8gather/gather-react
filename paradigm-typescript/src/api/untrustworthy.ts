//#region 接口数据不可信的前提
interface GeneralResponse<T> {
  code?: number;
  desc?: string;
  data?: T;
}

interface Dragon {
  name?: string;
}
//#endregion

//#region 页面需要的数据多于接口
interface DragonDataType {
  name?: string;
}

interface FEDragonType extends DragonDataType {
  tag?: string;
}
//#endregion
