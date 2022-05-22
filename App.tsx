import "react-native-gesture-handler";
import "react-native-get-random-values";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NotificationContainer } from "react-native-hook-notification";

import { Home } from "./src/presentation/pages/Home";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Home />
      <NotificationContainer xOffset={30} position="bottom-center" />
    </SafeAreaView>
  );
}
