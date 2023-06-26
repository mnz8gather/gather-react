type Marks = {
  category_key: React.Key;
  category_name: string;
  member: {
    label_value: React.Key;
    label_name: string;
    group_id?: React.Key;
    cannot_be_deleted?: boolean;
    remark?: string;
  }[];
}[];

type IV = {
  [x: string]: {
    [x: string]: (string | number)[];
  };
};
