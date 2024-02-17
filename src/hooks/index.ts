import { useRef } from "react";
import { DELAY } from "../constants/AppConstants";

export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callee: T,
  delay = DELAY,
) {
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return function (...args: Parameters<T>) {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      callee(...args);
      timerId.current = undefined;
    }, delay);
  };
}

export function useThrottle<T extends (...args: Parameters<T>) => void>(
  callee: T,
  delay = DELAY,
) {
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return function (...args: Parameters<T>) {
    if (!timerId.current) {
      timerId.current = setTimeout(() => {
        callee(...args);
        clearTimeout(timerId.current);
        timerId.current = undefined;
      }, delay);
    }
  };
}
