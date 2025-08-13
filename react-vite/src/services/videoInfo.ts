import request from '@/services/settled/request';
import type { GeneralResponse } from '@/services/generic';
import type { Marks } from '@/FK/Antd.Marking/interface';

export function video_label(): Promise<GeneralResponse<Marks>> {
  return request(`/mock/video/label`);
}

export function video_label_detail(id: string): Promise<GeneralResponse<number[]>> {
  return request(`/mock/video/label/${id}`);
}
