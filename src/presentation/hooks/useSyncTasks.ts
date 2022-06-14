import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNotification } from 'react-native-hook-notification';

import { makeSyncTasks } from '../../main/factories/usecases/syncTasks';
import { useAppStateListener } from './useAppStateListener';
import { useMutation } from './useMutation';
import { useStore } from '../store/useStore';

export const useSyncTasks = () => {
  const netInfo = useNetInfo();
  const { isError, mutate } = useMutation(makeSyncTasks);

  const isConnected = !!netInfo.isConnected;

  useAppStateListener(mutate, {
    enable: isConnected,
  });

  const initData = useStore(state => state.init);
  useEffect(() => {
    if (isConnected) {
      mutate().then(response => {
        if (response) {
          initData(response);
        }
      });
    }
  }, [mutate, isConnected, initData]);

  const notification = useNotification();
  useEffect(() => {
    if (isError) {
      notification.error({
        text: 'Task sync error!',
      });
    }
  }, [isError, notification]);
};
