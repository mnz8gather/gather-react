import type { MarkMode, Marks, MarkOptionType, MarkObjectValue } from './interface';

export function convert_to_object(alpha: React.Key[], marks?: Marks, mode?: MarkMode) {
  const omega: MarkObjectValue = {};

  if (!marks) {
    return omega;
  }

  marks?.forEach((e1) => {
    const e1_key = e1.category_key;
    if (e1_key === undefined || e1_key === null) {
      // 跳出本次循环
      return;
    }

    // 创建 e1_key
    omega[e1_key] = { checkbox: [] };

    if (e1?.members?.length > 0) {
      e1?.members?.forEach((e2) => {
        const e2_group_id = e2?.group_id;
        const temp3 = e2.label_value;
        if (alpha?.includes(temp3)) {
          if (mode === 'search' || e2_group_id === undefined || e2_group_id === null) {
            omega[e1_key]['checkbox'].push(temp3);
          } else {
            if (omega[e1_key]?.[e2_group_id]) {
              omega[e1_key][e2_group_id].push(temp3);
            } else {
              omega[e1_key][e2_group_id] = [temp3];
            }
          }
        }
      });
    }
  });

  return omega;
}

export function convert_to_array(alpha: MarkObjectValue) {
  let omega: React.Key[] = [];
  Object?.values(alpha).forEach((psi) => {
    if (psi) {
      Object?.values(psi).forEach((chi) => {
        if (chi?.length > 0) {
          omega = omega.concat(chi);
        }
      });
    }
  });

  return omega;
}

export function marks_members_convert_options(members: Marks[number]['members'], mode?: MarkMode) {
  const checkbox_options: MarkOptionType[] = [];
  const radio_options_map: Record<React.Key, MarkOptionType[]> = {};

  members?.forEach?.((e2) => {
    const temp_id = e2?.group_id;
    if (mode === 'search' || temp_id === undefined) {
      checkbox_options.push({
        label: e2.label_name,
        value: e2.label_value,
        cannot_be_deleted: e2?.cannot_be_deleted,
        remark: e2?.remark,
        id: e2?.id,
      });
    } else {
      if (radio_options_map[temp_id]) {
        radio_options_map[temp_id]?.push({
          label: e2.label_name,
          value: e2.label_value,
          cannot_be_deleted: e2?.cannot_be_deleted,
          remark: e2?.remark,
          id: e2?.id,
        });
      } else {
        radio_options_map[temp_id] = [
          { label: e2.label_name, value: e2.label_value, cannot_be_deleted: e2?.cannot_be_deleted, remark: e2?.remark, id: e2?.id },
        ];
      }
    }
  });

  return { checkbox_options, radio_options_map };
}
