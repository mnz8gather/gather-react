import { request } from "umi";

export function getCustom(customKey: string): Promise<string[]> {
  return request("/api/custom/getCustom", {
    method: "GET",
    params: { customKey },
  }).then((res) => res.data);
}

export function setCustom(customKey: string, customColumns: string[]) {
  return request("/api/custom/setCustom", {
    method: "POST",
    data: { customKey, customColumns },
  });
}
