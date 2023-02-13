import { useState } from 'react';
import { Button } from 'antd';
import CheckSortModal from '@/components/CheckSortModal';

const allGroups = [
  {
    groupLabel: 'G',
    member: [
      {
        value: 'g1',
        label: 'g1',
      },
      {
        value: 'g2',
        label: 'g2',
      },
      {
        value: 'g3',
        label: 'g3',
      },
      {
        value: 'g4',
        label: 'g4',
      },
      {
        value: 'g5',
        label: 'g5',
      },
      {
        value: 'g6',
        label: 'g6',
      },
      {
        value: 'g7',
        label: 'g7',
      },
    ],
  },
  {
    groupLabel: 'T',
    member: [
      {
        value: 't1',
        label: 't1',
      },
      {
        value: 't2',
        label: 't2',
      },
      {
        value: 't3',
        label: 't3',
      },
      {
        value: 't4',
        label: 't4',
      },
      {
        value: 't5',
        label: 't5',
      },
    ],
  },
];

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        自定义列
      </Button>
      <CheckSortModal allGroups={allGroups} defaultGroups={allGroups} destroyOnClose width={1000} open={open} setOpen={setOpen} />
    </>
  );
};
