import { useEffect, useState } from 'react';
import DropdownSortButtonControlled from '@/scene/Antd.DropdownSortButtonControlled';
import { Button, Space } from 'antd';
import type { EffectiveConditions, SortValue } from '@/scene/Antd.DropdownSortButton/interface';
import GeneralContainer from '@/alpha/layout/GeneralContainer';

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

  const [sortOpen2, setSortOpen2] = useState(false);
  const [condition2, setCondition2] = useState<SortValue[]>([{ uniqueIdentifier: new Date().getTime(), field: 'a', order: 'descend' }]);

  return (
    <GeneralContainer>
      <div style={{ height: '200px', width: '200px' }}>
        <Space>
          <DropdownSortButtonControlled
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
      </div>
      <div style={{ height: '200px', width: '200px' }}>
        <DropdownSortButtonControlled sortFields={sortFields} open={sortOpen2} onOpenChange={(open) => setSortOpen2(open)} value={condition2} />
      </div>
    </GeneralContainer>
  );
};
