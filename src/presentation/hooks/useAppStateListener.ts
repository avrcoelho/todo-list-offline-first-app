import { useEffect, useLayoutEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useAppStateListener = (func: () => void) => {
  const funcRef = useRef(func);

  useLayoutEffect(() => {
    funcRef.current = func;
  });

  const onExecute = (status: AppStateStatus) => {
    if (status === 'active') {
      funcRef.current();
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onExecute);

    return () => {
      subscription.remove();
    };
  }, []);
};
