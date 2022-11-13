import { useState } from 'react';
import { Button } from 'antd';
import WorkModal from '@/components/WorkModal';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        打开 Work Modal
      </Button>
      <WorkModal open={open} setOpen={setOpen} />
    </>
  );
};
