import type { ColumnType } from 'antd/lib/table';

export interface ColumnsConvertMap<RecordType> extends ColumnType<RecordType> {
  dataIndex: string;
}

export interface CustomGroupColumns {
  groupLabel: string;
  member: { label: string; value: string }[];
}

export interface CustomProps {
  allLabelColumns: CustomGroupColumns[];
  customKey: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Transform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export type ColumnsMap = Record<
  string,
  {
    label: string;
    value: string;
  }
>;

export interface GroupColumns<T> {
  groupLabel: string;
  member: ColumnsConvertMap<T>[];
}
