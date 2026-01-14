import { useEffect, useCallback } from 'react';

export const useEscapeKey = (callback: () => void, dependencies: any[] = []) => {
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        memoizedCallback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memoizedCallback]);
};