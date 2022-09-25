import type { CustomGroupColumns, ColumnsConvertMap, GroupColumns } from './types';

function flatColums(columns: CustomGroupColumns[]) {
  const flatColumsTmp = columns.flatMap((ele) => ele.member);
  return flatColumsTmp;
}

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

export function groupColumnsConvertColumns<T>(all: GroupColumns<T>[]): ColumnsConvertMap<T>[] {
  return all.map((ele) => ele.member).flat();
}

export function groupColumnsConvertLabelColumns<T>(all: GroupColumns<T>[]): CustomGroupColumns[] {
  return all.map((ele) => ({
    groupLabel: ele.groupLabel,
    member: ele.member.map((item) => ({ label: item.title as string, value: item.dataIndex })),
  }));
}

export function columnsConvertMap<T>(all: ColumnsConvertMap<T>[]): Record<string, ColumnsConvertMap<T>> {
  const dataIndexMap = all.reduce((data: Record<string, ColumnsConvertMap<T>>, item) => {
    data[item.dataIndex] = item;
    return data;
  }, {});
  return dataIndexMap;
}
