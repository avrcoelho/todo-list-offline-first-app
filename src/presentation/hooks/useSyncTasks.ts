import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNotification } from 'react-native-hook-notification';

import { makeSyncTasks } from '../../main/factories/usecases/syncTasks';
import { useAppStateListener } from './useAppStateListener';
import { useMutation } from './useMutation';

export const useSyncTasks = () => {
  const netInfo = useNetInfo();
  const { isError, isLoading, mutate } = useMutation(makeSyncTasks);

  const isConnected = !!netInfo.isConnected;

  useAppStateListener(mutate, {
    enable: isConnected,
  });

  // useEffect(() => {
  //   const canExecuteMutate = isConnected && !isLoading;
  //   if (canExecuteMutate) {
  //     mutate();
  //   }
  // }, [isLoading, mutate, isConnected]);

  const notification = useNotification();
  useEffect(() => {
    if (isError) {
      notification.error({
        text: 'Task sync error!',
      });
    }
  }, [isError, notification]);
};
