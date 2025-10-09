import { useRef } from 'react';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { MagicalEffect } from '@/BX/React.MagicalEffect';
import type { ParentComponentActions } from '@/BX/React.MagicalEffect';

export default function () {
  const ref = useRef<ParentComponentActions>(null);
  return (
    <GeneralContainer>
      <button
        onClick={() => {
          ref.current?.triggerActionsAndGetResults();
        }}
      >
        执行
      </button>
      <MagicalEffect ref={ref} />
    </GeneralContainer>
  );
}
