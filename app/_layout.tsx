import { Platform, Text, View } from "react-native";
import React, { Component, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabOneScreen from "./(tabs)";
import TabTwoScreen from "./(tabs)/two";
import TaskList from "@/TaskList";
import Header from "@/header";
import home from "@/home";
import { Dimensions } from "react-native";
import Profile from "./(tabs)/two";
import LogoutScreen from "./Interfaces/Logout";
import AboutScreen from "./(tabs)/_layout";



const { width } = Dimensions.get("window");
const { size, color } = { size: 24, color: "#1c8bfa" };
const MyDrawer = createDrawerNavigator();
type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

export default function DrawerLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const isWeb = Platform.OS === "web";
  return (
    <MyDrawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: "#3e2bcc",
        drawerActiveTintColor: color,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          paddingHorizontal: 20,
          marginLeft: 23,
          fontSize: 15,
          fontWeight: "500",
          color: "#333",
          textTransform: "capitalize",
        },

        drawerType: "slide",
        drawerIcon: () => (
          <Ionicons
            name="menu-outline"
            size={size}
            color={"#fff"}
            focus="true"
          />
        ),
        drawerStyle: {
          backgroundColor: "#fff",
          shadowColor: "transparent",
          paddingTop: 10,
          marginLeft: Platform.OS === "web" ? 0 : 0,
          marginTop: Platform.OS === "web" ? 20 : 0,
        },

        headerStyle: {
          marginLeft: Platform.OS === "web" ? 20 : 0,
          backgroundColor: "#fff",
          height: Platform.OS === "web" ? 60 : 100,
          color: "#fff",
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
          borderRadius: 7,
        },
        headerTitle: () => <Header />,
      }}
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
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          headerTitle: "Profile",
          headerTitleStyle: { fontSize: 23,paddingLeft:20, fontWeight: "bold", color: "#333" },
           headerStyle: {
          marginLeft: Platform.OS === "web" ? 20 : 0,
          backgroundColor: "#fff",
          height: Platform.OS === "web" ? 60 : 100,
          color: "#fff",
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
          borderRadius: 7,
        },
        }}
      />
      <MyDrawer.Screen
        name="All Task"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="layers-outline" size={24} color={color} />
          ),
          headerTitle: "All Tasks",
         headerTitleStyle: { fontSize: 23,paddingLeft:20, fontWeight: "bold", color: "#333" },
           headerStyle: {
          marginLeft: Platform.OS === "web" ? 20 : 0,
          backgroundColor: "#fff",
          height: Platform.OS === "web" ? 60 : 100,
          color: "#fff",
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
          borderRadius: 7,
        },
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
            onCancelButtonPress: () => setSearchQuery(""),
            onSubmitEditing: () =>
              console.log("Recherche validée : ", searchQuery),
            hideWhenScrolling: true,
            showCancelButton: true,
            clearButtonMode: "always",
            autoFocus: true,

            inputStyle: {
              color: "#fff",
              fontSize: 10,
              fontWeight: "500",
            },
            inputContainerStyle: {
              backgroundColor: "#1c8bfa",
              borderRadius: 8,
              paddingHorizontal: 10,
            },
            containerStyle: {
              width: isWeb ? (width > 1000 ? 400 : 250) : undefined,
              marginLeft: isWeb ? (width > 1000 ? 100 : 30) : undefined,
              paddingTop: 10,
              marginBottom: 10,
            },
          },
        }}
      >
        {(props) => <TaskList {...props} searchQuery={searchQuery} />}
      </MyDrawer.Screen>

      <MyDrawer.Screen
        name="Settings"
        component={TabOneScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
          headerTitleStyle: { fontSize: 23,paddingLeft:20, fontWeight: "bold", color: "#333" },
          headerStyle: {
          marginLeft: Platform.OS === "web" ? 20 : 0,
          backgroundColor: "#fff",
          height: Platform.OS === "web" ? 60 : 100,
          color: "#fff",
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
          borderRadius: 7,
        },
        }}
      />
      <MyDrawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={24} color={color} />
          ),
          headerTitleStyle: { fontSize: 23,paddingLeft:20, fontWeight: "bold", color: "#333" },
          headerStyle: {
          marginLeft: Platform.OS === "web" ? 20 : 0,
          backgroundColor: "#fff",
          height: Platform.OS === "web" ? 60 : 100,
          color: "#fff",
          shadowColor: "transparent",
          shadowOffset: { width: 0, height: 0 },
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
          borderRadius: 7,
        },
        }}
      />
     
    </MyDrawer.Navigator>
  );
}

