import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ( ) => {
  const [user, setUser] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    bio: 'Développeur mobile passionné par React Native',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  // Charger les données utilisateur au montage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    };
    
    loadUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        { 
          text: 'Déconnexion', 
          onPress: async () => {
            await AsyncStorage.removeItem('user');
            navigation.navigate('Logout');
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: user.avatar }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={20} color="#666" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={20} color="#666" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>À propos</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Déconnexion</Text>
        <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#3498db',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default ProfileScreen;