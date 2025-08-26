import type { MutableRefObject } from 'react';

export type TargetValue = Document | HTMLElement | undefined | null;

export type BasicTarget = MutableRefObject<TargetValue> | TargetValue;

export function getTargetParentElement(target: BasicTarget, defaultElement?: TargetValue) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue;

  if ('current' in target) {
    if (target.current?.parentElement) {
      targetElement = target.current.parentElement;
    } else {
      targetElement = target.current;
    }
  } else {
    targetElement = target;
  }

  return targetElement;
}

const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
