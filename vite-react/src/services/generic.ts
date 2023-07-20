interface GeneralInfo {
  version?: string;
  code?: number;
  desc?: string;
  total?: number;
  page?: number;
}

export interface GeneralResponse<T> {
  info?: GeneralInfo;
  results?: T;
}

export interface PageRequest {
  page?: number;
  size?: number;
}
