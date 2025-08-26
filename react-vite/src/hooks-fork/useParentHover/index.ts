import { useBoolean } from 'ahooks';
import { useEventListener4Parent } from './useEventListener4Parent';
import type { BasicTarget } from './domTarget';

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export const useParentHover = (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave, onChange } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener4Parent(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
      onChange?.(true);
    },
    {
      target,
    },
  );

  useEventListener4Parent(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
      onChange?.(false);
    },
    {
      target,
    },
  );

  return state;
};
