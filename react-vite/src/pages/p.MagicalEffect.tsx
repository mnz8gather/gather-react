import { useRef } from 'react';
import { GeneralContainer } from '@/share/GeneralContainer';
import { MagicalEffect } from '@/FK/React.MagicalEffect';
import type { ParentComponentActions } from '@/FK/React.MagicalEffect';

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
