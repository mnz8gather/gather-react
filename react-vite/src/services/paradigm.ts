import request from '@/services/settled/request';
import type { GeneralResponse, PageRequest } from '@/services/generic';

export interface ParadigmUserParams extends PageRequest {
  gender?: string;
}

export interface ParadigmUserItem {
  email: string;
  phone: string;
  gender: string;
  name: string;
}

export function paradigm_user(params: ParadigmUserParams): Promise<GeneralResponse<ParadigmUserItem[]>> {
  return request(`/mock/paradigm/user`, { params });
}
