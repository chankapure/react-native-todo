import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import TaskInputField from "./components/TaskInputField";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  };

  const confirmDelete = (deleteIndex) =>
    Alert.alert("Delete confirmation", "Are you sure to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log(`${deleteIndex} deleted`),
        style: "cancel",
      },
      {
        text: "Yes, Delete",
        onPress: () => {
          deleteTask(deleteIndex);
        },
      },
    ]);

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MY TASK STATUS LIST</Text>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem
                index={index + 1}
                task={task}
                deleteTask={() => confirmDelete(index)}
              />
            </View>
          );
        })}
        {tasks && !tasks.length && (
          <View key={0} style={styles.taskContainer}>
            <TaskItem index={false} task={"No items found"} />
          </View>
        )}
      </ScrollView>
      <TaskInputField addTask={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1A3C",
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  task: {
    color: "#fff",
    width: "90%",
    fontSize: 16,
  },
});
