import "react-native-gesture-handler";
import "react-native-get-random-values";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NotificationContainer } from "react-native-hook-notification";

import { makeGetTasks } from "./src/main/factories/usecases/getTasks";
import { Home } from "./src/presentation/pages/Home";

export default function App() {
  useEffect(() => {
    makeGetTasks()
      .execute()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Home />
      <NotificationContainer xOffset={30} position="bottom-center" />
    </SafeAreaView>
  );
}
