import "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { makeGetTasks } from "./src/main/factories/usecases/getTasks";
import { makeUpdateTask } from "./src/main/factories/usecases/updateTask";
import { Home } from "./src/presentation/pages/Home";
import { SafeAreaView } from "react-native";

export default function App() {
  useEffect(() => {
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
    </SafeAreaView>
  );
}
