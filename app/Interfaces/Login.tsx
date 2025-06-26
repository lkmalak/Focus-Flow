import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginScreenProps {
  setIsLoggedIn: (value: boolean) => void;
  setIsSignup: (value: boolean) => void;
}

export default function LoginScreen({ setIsLoggedIn, setIsSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem("users");
      const users: { id: string; email: string; password: string }[] = usersData ? JSON.parse(usersData) : [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {

        await AsyncStorage.setItem("user", JSON.stringify(foundUser));
        setIsLoggedIn(true);
      } else {
        Alert.alert("Erreur", "Identifiants incorrects");
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la connexion");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(false)}>
        <Text style={styles.link}>
          Pas encore de compte ? S'inscrire
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
       paddingHorizontal: 20,
       paddingVertical: 20,
       marginLeft: Platform.OS === "web" ? 0 : 0,
       padding: 20,
   
       backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  link: { 
    textAlign: "center", 
    color: "#3498db" 
  },
});