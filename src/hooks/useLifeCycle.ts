import { useEffect } from 'react';

export const useLifeCycle = (onStart: () => void, onFinish: () => void) => {
  useEffect(() => {
    onStart();
    return function cleanup() {
      onFinish();
    };
  }, []);
};
