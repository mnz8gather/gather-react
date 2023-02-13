import type { Group } from './types';

export function diffStringArray(prev: string[], current: string[]): [boolean, string] {
  const oldData = prev.reduce((data: Record<string, boolean>, item) => {
    data[item] = true;
    return data;
  }, {});

  let add: string | undefined = undefined;

  for (const item of current) {
    if (!oldData[item]) {
      add = item;
    } else {
      oldData[item] = false;
    }
  }

  if (add) {
    return [true, add];
  }
  const remove = prev.filter((item) => oldData[item]);
  return [false, remove[0]];
}

export function groupsConvertItems(groups?: Group[]): Group['member'] | undefined {
  if (groups) {
    return groups.map((ele) => ele.member).flat();
  }
  return undefined;
}
