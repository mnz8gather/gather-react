import { useRef } from 'react';
import { GeneralContainer } from '@/share/GeneralContainer';
import { MagicalEffect } from '@/paradigms/React.MagicalEffect';
import type { ParentComponentActions } from '@/paradigms/React.MagicalEffect';

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
