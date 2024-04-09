import { useState } from 'react';
import DropdownSortButton from '@/scene/DndKit.DropdownSortButton';
import type { EffectiveConditions } from '@/scene/DndKit.DropdownSortButton/interface';
import GeneralContainer from '@/alpha/layout/GeneralContainer';

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
    <GeneralContainer>
      <DropdownSortButton
        sortFields={sortFields}
        open={sortOpen}
        onOpenChange={(open) => setSortOpen(open)}
        onEffectiveConditionChange={(effectiveCondition) => {
          setEffectiveCondition(effectiveCondition);
        }}
      />
    </GeneralContainer>
  );
};
