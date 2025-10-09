import type { CheckboxOptionType } from 'antd';

export type MarkMode = 'normal' | 'editable' | 'search';

export type Marks = Mark[];

interface Mark {
  category_key: React.Key;
  category_name: string;
  members: MarkMember[];
}

interface MarkMember {
  id?: React.Key;
  label_name: string;
  label_value: React.Key;
  remark?: string;
  group_id?: React.Key;
  cannot_be_deleted?: boolean;
}

export interface MarkOptionType extends CheckboxOptionType {
  id?: React.Key;
  remark?: string;
  cannot_be_deleted?: boolean;
}

export interface MarkObjectValue {
  [x: string]: {
    [x: string]: React.Key[];
  };
}
