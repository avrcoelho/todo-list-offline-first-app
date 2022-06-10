import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const DEFAULT_OPTIONS = {
  enable: true,
};

export const useAppStateListener = (
  func: () => void,
  options = DEFAULT_OPTIONS,
) => {
  const funcRef = useRef(func);

  useLayoutEffect(() => {
    funcRef.current = func;
  });

  const onExecute = useCallback(
    (status: AppStateStatus) => {
      if (status === 'active' && options?.enable) {
        funcRef.current();
      }
    },
    [options?.enable],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onExecute);

    return () => {
      subscription.remove();
    };
  }, [onExecute]);
};
