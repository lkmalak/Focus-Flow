import 'react-native-gesture-handler';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Login from "./Interfaces/Login";

import {Drawer} from "expo-router/drawer"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native';

export default function Header() {
  const { height,width } = Dimensions.get("window");
   const [open, setOpen] = React.useState(false);
  return (
    
      <SafeAreaView style={styles.header}>

        
          <Image
            source={require("./assets/owl.png")}
            style={{ width: 40, height: 40, margin:20, borderRadius: 20 }}
          />
       <Text 
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#333",
            marginLeft: 20,
          }}
        >
          Focus Flow 
        </Text> 
      </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4F3",
     marginLeft: Platform.OS === "web" ? 250 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
     marginLeft: Platform.OS === "web" ? 250 : 0,
  },
});
