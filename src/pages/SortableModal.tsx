import { useState } from 'react';
import { Button } from 'antd';
import SortModalCheckbox from '@/components/SortModalCheckbox';
import { allGroups } from '@/../mock/example';

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
      <SortModalCheckbox allGroups={allGroups} defaultGroups={allGroups} destroyOnClose width={1000} open={open} setOpen={setOpen} />
    </>
  );
};
