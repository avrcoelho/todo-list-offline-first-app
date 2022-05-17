import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { makeGetTasks } from "./src/main/factories/usecases/getTasks";
import { makeCreateTask } from "./src/main/factories/usecases/createTask";

export default function App() {
  useEffect(() => {
    makeCreateTask()
      .execute({ name: "task 1", status: "solved" })
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
