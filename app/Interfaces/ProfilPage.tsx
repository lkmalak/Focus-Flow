import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Charger les données utilisateur
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
        setUser({
          id: parsedUser.id || '',
          username: parsedUser.username || '',
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          age: parsedUser.age || '',
          avatar: parsedUser.avatar || require('../../assets/images/inconnu.jpg')
        });
          alert('Bienvenue ' + JSON.parse(userData).username);

        } else {
          // Valeurs par défaut si aucun utilisateur n'est trouvé
          setUser({
            avatar: require('../../assets/images/inconnu.jpg') // Utilisation de require pour les images locales
          });

        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
        Alert.alert('Erreur', 'Impossible de charger les données du profil');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  


  const handleEditProfile = () => {
    navigation.navigate('EditProfile',{user});
  };

  if (isLoading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image 
  source={typeof user.avatar === 'string' ? { uri: user.avatar } : user.avatar}
  style={styles.avatar}
  onError={() => setUser(prev => ({...prev, avatar: require('../../assets/images/inconnu.jpg')}))}
  defaultSource={require('../../assets/images/inconnu.jpg')}
/>
        <Text style={styles.name}>{user.username}</Text>
       
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        
        {user.email && (
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        )}

        {user.age && (
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{user.age}</Text>
          </View>
        )}
      </View>

      {user.bio && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Modifier le profil</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.5,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
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
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#555',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#3566fc',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;