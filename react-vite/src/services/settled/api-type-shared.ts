interface GeneralResponseInfo {
  code: number;
  message: string;
}

/**
 * 通用的响应结构
 */
export interface GeneralResponse<T> extends GeneralResponseInfo {
  data: T;
}

export interface GeneralPagingParams {
  current: number;
  pageSize: number;
}

/**
 * 分页的响应结构
 */
export interface GeneralPagingResponse<T> extends GeneralResponseInfo {
  total: number;
  data: T;
}
