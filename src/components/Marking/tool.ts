export function convert_to_object(alpha: React.Key[], marks?: Marks) {
  const omega: IV = {};

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

    if (e1?.member?.length > 0) {
      e1?.member?.forEach((e2) => {
        const e2_group_id = e2?.group_id;
        const temp3 = e2.label_value;
        if (alpha?.includes(temp3)) {
          if (e2_group_id !== undefined && e2_group_id !== null) {
            if (omega[e1_key]?.[e2_group_id]) {
              omega[e1_key][e2_group_id].push(temp3);
            } else {
              omega[e1_key][e2_group_id] = [temp3];
            }
          } else {
            omega[e1_key]['checkbox'].push(temp3);
          }
        }
      });
    }
  });

  return omega;
}

export function convert_to_array(alpha: IV) {
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
