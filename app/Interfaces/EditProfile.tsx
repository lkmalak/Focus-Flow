import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ route, navigation }) => {
  const { user: initialUser } = route.params;
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (name, value) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setUser(prev => ({ ...prev, avatar: result.assets[0].uri }));
        setImageError(false);
      }
    } catch (error) {
      console.error('Erreur de sélection d\'image:', error);
      Alert.alert('Erreur', 'Impossible de sélectionner une image');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Succès', 'Profil mis à jour avec succès');
      navigation.goBack();
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder les modifications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              imageError || !user.avatar
                ? require('../../assets/images/inconnu.jpg')
                : typeof user.avatar === 'string'
                ? { uri: user.avatar }
                : user.avatar
            }
            style={styles.avatar}
            onError={() => setImageError(true)}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom d'utilisateur</Text>
        <TextInput
          style={styles.input}
          value={user.username}
          onChangeText={text => handleChange('username', text)}
          placeholder="Entrez votre nom d'utilisateur"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom complet</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={text => handleChange('name', text)}
          placeholder="Entrez votre nom complet"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={text => handleChange('email', text)}
          placeholder="Entrez votre email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Âge</Text>
        <TextInput
          style={styles.input}
          value={user.age}
          onChangeText={text => handleChange('age', text)}
          placeholder="Entrez votre âge"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={user.bio}
          onChangeText={text => handleChange('bio', text)}
          placeholder="Décrivez-vous en quelques mots..."
          multiline
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#eee',
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#3498db',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;