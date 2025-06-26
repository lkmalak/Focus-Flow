import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // 1. Effacer TOUTES les données d'authentification
        await AsyncStorage.removeItem('user');
        
        // 2. Réinitialiser complètement la navigation
        navigation.dispatch(
          StackActions.replace('AuthStack', {
            screen: 'Login',
          })
        );
      } catch (error) {
        console.error('Logout error:', error);
        navigation.dispatch(StackActions.replace('Login'));
      }
    };

    handleLogout(); // Appel de la fonction de déconnexion
  }, [navigation]);

  return <ActivityIndicator size="large" />;
};

export default LogoutScreen;