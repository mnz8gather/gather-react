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

/**
 * 分页的请求结构
 */
export interface PageRequest {
  page?: number;
  size?: number;
}

interface SampleItem {
  id: number;
  name: string;
  region: string;
}

interface GetSampleParams {
  region?: string;
}

/** 示例 分页 */
export function get_sample(params?: GetSampleParams): Promise<GeneralResponse<SampleItem[]>> {
  console.log('params', params);
  // request by params
  return Promise.resolve({ code: 1001, result: [{ id: 1, name: 'a', region: 'r1' }], total: 1, page: 1 });
}

interface GetSampleInfoParams {
  id: number;
}

interface GetSampleInfoResponse {
  id: number;
  name: string;
  region: string;
  content: string;
}

/** 示例 不分页 */
export function get_sample_info(params: GetSampleInfoParams): Promise<GeneralResponse<GetSampleInfoResponse>> {
  console.log('params', params);
  // request by params
  return Promise.resolve({ code: 1001, result: { id: 1, name: 'a', region: 'r1', content: 'c1' } });
}
