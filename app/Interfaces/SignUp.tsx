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

interface SignupScreenProps {
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupScreen({ setIsSignup }: SignupScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const usersData = await AsyncStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const userExists = users.some(
        (u: { username: string }) => u.username === username
      );

      if (userExists) {
        Alert.alert("Erreur", "Ce nom d'utilisateur existe déjà.");
        return;
      }

      users.push({ username, password });
      await AsyncStorage.setItem("users", JSON.stringify(users));
      Alert.alert("Succès", "Compte créé avec succès.");
      setIsSignup(true);
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup(true)}>
        <Text style={styles.link}>Déjà un compte? Se connecter</Text>
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
  title: { fontSize: 28, textAlign: "center", marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { textAlign: "center", color: "#2980b9" },
});
