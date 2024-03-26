import { useRef } from 'react';
import { Button } from 'antd';
import RefComponent from '@/components/RefComponent';
import GeneralContainer from '@/components/layout.GeneralContainer';
import type { RefComponentRef } from '@/components/RefComponent';

export default function () {
  const ref = useRef<RefComponentRef>(null);

  return (
    <GeneralContainer>
      <Button
        onClick={() => {
          ref?.current?.afunction();
        }}
      >
        执行 afunction
      </Button>
      <RefComponent ref={ref} />
    </GeneralContainer>
  );
}
