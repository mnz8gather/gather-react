import { useRef, useEffect } from 'react';
import { useUnmount } from 'ahooks';
import { getTargetParentElement } from './domTarget';
import type { DependencyList, EffectCallback } from 'react';
import type { BasicTarget, TargetValue } from './domTarget';

/**
 *
 * @param effect
 * @param deps
 * @param target
 */
export const useEffectWithTarget = (effect: EffectCallback, deps: DependencyList, target: BasicTarget | BasicTarget[]) => {
  const hasInitRef = useRef(false);

  const lastElementRef = useRef<TargetValue[]>([]);
  const lastDepsRef = useRef<DependencyList>([]);

  const unLoadRef = useRef<any>();

  useEffect(() => {
    const targets = Array.isArray(target) ? target : [target];
    const els = targets.map((item) => getTargetParentElement(item));

    // init run
    if (!hasInitRef.current) {
      hasInitRef.current = true;
      lastElementRef.current = els;
      lastDepsRef.current = deps;

      unLoadRef.current = effect();
      return;
    }

    if (els.length !== lastElementRef.current.length || !depsAreSame(lastElementRef.current, els) || !depsAreSame(lastDepsRef.current, deps)) {
      unLoadRef.current?.();

      lastElementRef.current = els;
      lastDepsRef.current = deps;
      unLoadRef.current = effect();
    }
  });

  useUnmount(() => {
    unLoadRef.current?.();
    // for react-refresh
    hasInitRef.current = false;
  });
};

function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
}
