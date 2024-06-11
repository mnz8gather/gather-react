import { useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { Dropdown, Button, Divider, Space } from 'antd';
import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import SortConditions from './SortConditions';
import { SortFieldsContextProvider } from './context';
import type { DropdownSortButtonProps, SortValue, EffectiveConditions } from './interface';

const sortValueInit: SortValue[] = [{ uniqueIdentifier: new Date().getTime(), field: undefined, order: undefined }];

const DropdownSortButtonControlled = (props: DropdownSortButtonProps) => {
  const { sortFields, maxNumber, value, onConditionChange, onEffectiveConditionChange, ...restProps } = props;
  // Maximum number of sorting conditions
  const maxConditionsNumber = maxNumber || sortFields?.length;

  const [sortValue, setSortValue] = useState<SortValue[]>(value || sortValueInit);

  /**
   * sortFields 每一个 field 只能选择一次
   * 已选的字段不能再选
   *
   * 有效更新：
   *    字段和顺序全部选定的情况下，新增，删除，顺序改变
   *
   */

  const updateSortValue: React.Dispatch<React.SetStateAction<SortValue[]>> = (temporary) => {
    if (typeof temporary === 'function') {
      const next = temporary?.(sortValue);
      setSortValue(next);
      onConditionChange?.(next);
      if (diffCondition(sortValue, next)) {
        onEffectiveConditionChange?.(filterCondition(next));
      }
    } else {
      setSortValue(temporary);
      onConditionChange?.(temporary);
      if (diffCondition(sortValue, temporary)) {
        onEffectiveConditionChange?.(filterCondition(temporary));
      }
    }
  };

  // synchronize a component with an external system.
  useUpdateEffect(() => {
    // keep the array type
    setSortValue(value || []);

    if (diffCondition(sortValue, value || [])) {
      onEffectiveConditionChange?.(filterCondition(value || []));
    }
  }, [value]);

  return (
    <Dropdown
      {...restProps}
      trigger={['click']}
      overlayStyle={{ backgroundColor: '#fff', padding: '5px 10px' }}
      dropdownRender={() => (
        <Space direction='vertical' size={4}>
          <SortFieldsContextProvider value={sortFields}>
            <SortConditions conditions={sortValue} setSort={updateSortValue} />
          </SortFieldsContextProvider>
          <Divider style={{ margin: 0 }} />
          <Button
            block
            type='text'
            disabled={sortValue && sortValue?.length >= maxConditionsNumber}
            icon={<PlusOutlined />}
            onClick={() => updateSortValue((prev) => [...prev, { uniqueIdentifier: new Date().getTime(), field: undefined, order: undefined }])}
            style={{ textAlign: 'left' }}
          >
            添加排序条件
          </Button>
        </Space>
      )}
    >
      <Button
        size='small'
        icon={<SwapOutlined rotate={90} />}
        style={
          sortValue?.filter((ele) => ele.field && ele.order)?.length
            ? {
                borderColor: '#2176ff',
                color: '#2176ff',
                backgroundColor: '#DEEBFF',
              }
            : undefined
        }
      >
        排序
      </Button>
    </Dropdown>
  );
};

export { DropdownSortButtonControlled };

function diffCondition(prev: SortValue[], next: SortValue[]): boolean {
  let effective = true;

  const fp = filterCondition(prev);
  const fn = filterCondition(next);

  if (fp.length !== fn.length) {
    return effective;
  }

  if (fp.length === 0 && fn.length === 0) {
    effective = false;
    return effective;
  }

  let long, short;
  if (fp.length > fn.length) {
    long = fp;
    short = fn;
  } else {
    long = fn;
    short = fp;
  }
  for (const [index, ele] of long.entries()) {
    const sameField = ele.field === short[index].field;
    const sameOrder = ele.order === short[index].order;
    if (sameField && sameOrder) {
      effective = false;
    } else {
      return (effective = true);
    }
  }

  return effective;
}

function filterCondition(condition: SortValue[]) {
  return condition.filter((ele) => ele.field && ele.order).map((ele) => ({ field: ele.field, order: ele.order })) as EffectiveConditions;
}
