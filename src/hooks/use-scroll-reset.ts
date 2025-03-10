import { useEffect } from 'react';

export function useScrollReset() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
