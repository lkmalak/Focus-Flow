import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabOneScreen from "./(tabs)";
import TabTwoScreen from "./(tabs)/two";
import TaskList, { onSearch } from "@/TaskList";
import Header from "@/header";
import home from "@/home";

const { size, color } = { size: 24, color: "#1c8bfa" };
const MyDrawer = createDrawerNavigator();
type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function DrawerLayout() {
const [searchQuery, setSearchQuery] = useState("");

  return (
    <MyDrawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: color,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: 22,
          fontSize: 14,
          fontWeight: "500",
          color: "#333",
        },
        drawerType: "slide",
        drawerIcon: ({ color }) => (
          <Ionicons name="menu-outline" size={size} color={color} />
        ),
        drawerStyle: {
          backgroundColor: "#f7f4f3",
          width: 240,
        },

        headerStyle: {
          backgroundColor: "#f7f4f3",
          height: 80,
          shadowColor: "transparent",
        },
        headerTitle: () => <Header />,
        headerTitleStyle: { fontSize: 20, fontWeight: "bold", color: "#333" },
      }}
      initialRouteName="All Task"
    >
      <MyDrawer.Screen
        name="Home"
        component={home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <MyDrawer.Screen
        name="All Task"
        
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="layers-outline" size={24} color={color} />
          ),
          headerSearchBarOptions: {
      placeholder: "Search",
      onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
      onCancelButtonPress: () => setSearchQuery(""),
    },
  }}
>
  {(props) => <TaskList {...props} searchQuery={searchQuery} />}
</MyDrawer.Screen>
      <MyDrawer.Screen
        name="Profile"
        component={TabTwoScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <MyDrawer.Screen
        name="Settings"
        component={TabOneScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </MyDrawer.Navigator>
  );
}

function setTodos(oldTodos: ToDoType[]) {
  throw new Error("Function not implemented.");
}
