// import "./wdyr";
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NotificationContainer } from 'react-native-hook-notification';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { Home } from './src/presentation/pages/Home';

const X_OFFSET = isIphoneX() ? 30 : 10;

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Home />
      <NotificationContainer xOffset={X_OFFSET} position="bottom-center" />
    </SafeAreaView>
  );
}
