import { useLatest } from 'ahooks';
import type { BasicTarget } from './domTarget';
import { getTargetParentElement } from './domTarget';
import { useEffectWithTarget } from './useEffectWithTarget';

type noop = (...p: any) => void;

type Target = BasicTarget;

type Options<T extends Target = Target> = {
  target?: T;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  enable?: boolean;
};

function useEventListener4Parent<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: Options<HTMLElement>,
): void;
function useEventListener4Parent<K extends keyof DocumentEventMap>(eventName: K, handler: (ev: DocumentEventMap[K]) => void, options?: Options<Document>): void;
function useEventListener4Parent(eventName: string, handler: noop, options: Options): void;

function useEventListener4Parent(eventName: string, handler: noop, options: Options = {}) {
  const { enable = true } = options;

  const handlerRef = useLatest(handler);

  useEffectWithTarget(
    () => {
      if (!enable) {
        return;
      }

      const targetElement = getTargetParentElement(options.target, document);
      if (!targetElement?.addEventListener) {
        return;
      }

      const eventListener = (event: Event) => {
        return handlerRef.current(event);
      };

      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive,
      });

      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture,
        });
      };
    },
    [eventName, options.capture, options.once, options.passive, enable],
    options.target,
  );
}

export { useEventListener4Parent };
