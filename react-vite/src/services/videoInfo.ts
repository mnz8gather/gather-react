import request from '@/services/request';
import type { GeneralResponse } from '@/services/generic';
import type { Marks } from '@/scene/Antd.Marking/interface';

export function video_label(): Promise<GeneralResponse<Marks>> {
  return request(`/mock/video/label`);
}

export function video_label_detail(id: string): Promise<GeneralResponse<number[]>> {
  return request(`/mock/video/label/${id}`);
}
