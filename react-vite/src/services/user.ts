import request from '@/services/settled/request';
import type { GeneralPagingParams, GeneralPagingResponse } from '@/services/settled/api-type-shared';

interface UserListParams extends Partial<GeneralPagingParams> {
  begin?: number;
  end?: number;
  sex?: string;
}

export interface User {
  id: string;
  sex: string;
  name: string;
  birthday: number;
}

export function user_list(params?: UserListParams): Promise<GeneralPagingResponse<User[]>> {
  return request(`/mock/user`, { params });
}
