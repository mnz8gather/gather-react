import request from '@/services/request';
import type { GeneralPagingParams, GeneralPagingResponse } from '@/services/api-type-shared';

interface UserListParams extends GeneralPagingParams {
  begin?: number;
  end?: number;
  sex?: string;
}

interface User {
  id: string;
  sex: string;
  name: string;
  birthday: number;
}

export function user_list(params: UserListParams): Promise<GeneralPagingResponse<User[]>> {
  return request(`/mock/user`, { params });
}
