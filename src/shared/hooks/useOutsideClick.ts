import { RefObject, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler?: (e: Event) => void
) => {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler && handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
