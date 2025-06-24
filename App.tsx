import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Image } from "react-native";
import TaskList from "./TaskList";


export default function App() {
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simule un chargement
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
         <Image
        source={require("./assets/owl.png")}
        style={{ width: 220, height: 220, marginBottom: 50 }}
      />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      
    <TaskList />
    <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    marginLeft: Platform.OS === "web" ? 0 : 0,
  },
});

