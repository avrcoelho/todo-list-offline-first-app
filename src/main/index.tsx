import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NotificationContainer } from 'react-native-hook-notification';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Home } from '../presentation/pages/Home';
import { useSyncTasks } from '../presentation/hooks/useSyncTasks';

const X_OFFSET = isIphoneX() ? 30 : 10;

export const Main = () => {
  useSyncTasks();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Home />
        <NotificationContainer xOffset={X_OFFSET} position="bottom-center" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
