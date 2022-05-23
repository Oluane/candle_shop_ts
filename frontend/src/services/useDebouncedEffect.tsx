import { useCallback, useEffect } from "react";

export const useDebouncedEffect = (effect: () => void, delay: number, deps: string[]) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
