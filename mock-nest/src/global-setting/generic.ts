/**
 * 响应时，可选项
 */
interface OptionalResponse {
  /** 状态码 */
  code?: number;
  /** 状态描述信息 */
  message?: string;
  /** 分页时，表达总数 */
  total?: number;
  /** 分页时，表达页码 */
  page?: number;
  /** 系统版本 */
  version?: string;
}

/**
 * 一般的响应结构
 */
export interface GeneralResponse<T> extends OptionalResponse {
  result?: T;
}
