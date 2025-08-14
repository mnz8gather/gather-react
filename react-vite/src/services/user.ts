import request from '@/services/settled/request';
import type { GeneralPagingParams, GeneralPagingResponse } from '@/services/settled/api-type-shared';

export interface UserListFilter {
  begin?: number;
  end?: number;
  sex?: string;
}

interface UserListParams extends UserListFilter, Partial<GeneralPagingParams> {}

export interface User {
  id: string;
  sex: string;
  name: string;
  birthday: number;
  jobTitle: string;
  jobType: string;
}

export function user_list(params?: UserListParams): Promise<GeneralPagingResponse<User[]>> {
  return request(`/mock/user`, { params });
}
