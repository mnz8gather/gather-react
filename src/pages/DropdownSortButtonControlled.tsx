import { useEffect, useState } from 'react';
import { DropdownSortButton } from '@/components';
import { Button, Space } from 'antd';
import type { EffectiveConditions, SortValue } from '@/components/DropdownSortButton/interface';

const sortFields = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
];

export default () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [condition, setCondition] = useState<SortValue[]>();
  const [effectiveCondition, setEffectiveCondition] = useState<EffectiveConditions>();

  useEffect(() => {
    console.log('effectiveCondition', effectiveCondition);
  }, [effectiveCondition]);

  return (
    <Space>
      <DropdownSortButton
        sortFields={sortFields}
        open={sortOpen}
        onOpenChange={(open) => setSortOpen(open)}
        value={condition}
        onConditionChange={setCondition}
        onEffectiveConditionChange={setEffectiveCondition}
      />

      <Button
        onClick={() => {
          setCondition([{ uniqueIdentifier: new Date().getTime(), field: 'a', order: 'descend' }]);
        }}
      >
        set A descend
      </Button>
      <Button
        onClick={() => {
          setCondition(undefined);
        }}
      >
        Clean
      </Button>
    </Space>
  );
};
