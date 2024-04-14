import { useRef } from 'react';
import { Button } from 'antd';
import RefComponent from '@/paradigms/React.Ref';
import GeneralContainer from '@/alpha/layout/GeneralContainer';
import type { RefComponentRef } from '@/paradigms/React.Ref';

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
