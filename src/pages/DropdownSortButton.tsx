import { useState } from 'react';
import DropdownSortButton from '@/components/DropdownSortButton';
import type { EffectiveConditions } from '@/components/DropdownSortButton/interface';

const sortFields = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
];

export default () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [effectiveCondition, setEffectiveCondition] = useState<EffectiveConditions>();

  return (
    <DropdownSortButton
      sortFields={sortFields}
      open={sortOpen}
      onOpenChange={(open) => setSortOpen(open)}
      onEffectiveConditionChange={(effectiveCondition) => {
        setEffectiveCondition(effectiveCondition);
      }}
    />
  );
};
