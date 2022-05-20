import "react-native-gesture-handler";
import { useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  NotificationContainer,
  useNotification,
} from "react-native-hook-notification";

import { makeGetTasks } from "./src/main/factories/usecases/getTasks";
import { makeUpdateTask } from "./src/main/factories/usecases/updateTask";
import { Home } from "./src/presentation/pages/Home";

const notificationXoffset = Platform.select({
  ios: 40,
  android: 0,
});

export default function App() {
  const notification = useNotification();

  useEffect(() => {
    notification.success({
      text: "Notification dispatched",
    });
    makeUpdateTask()
      .execute({
        name: "task updated",
        status: "solved",
        _id: "62841ab3a2e00c29342154e3",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
      <NotificationContainer xOffset={notificationXoffset} />
    </SafeAreaView>
  );
}
