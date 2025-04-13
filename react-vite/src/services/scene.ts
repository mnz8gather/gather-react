import request from '@/services/request';
import type { GeneralResponse } from '@/services/generic';

export function upload_file(params: FormData): Promise<GeneralResponse<unknown>> {
  return request(`/mock/scene/upload_file`, { params });
}
