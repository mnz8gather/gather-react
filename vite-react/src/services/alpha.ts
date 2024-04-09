import request from '@/services/request';
import type { GeneralResponse, PageRequest } from '@/services/generic';

interface AlphaListParams extends PageRequest {
  someCode?: string;
}

interface AlphaListItem {
  title?: string;
}

export function alpha_list(params: AlphaListParams): Promise<GeneralResponse<AlphaListItem[]>> {
  return request(`/mock/alpha/list`, { params });
}
