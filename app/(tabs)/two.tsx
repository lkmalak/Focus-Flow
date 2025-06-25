import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../Interfaces/SignUp';
import LogoutScreen from '../Interfaces/Logout';
import LoginScreen from '../Interfaces/Login';
import ProfileScreen from '../Interfaces/ProfilPage';

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null for initial loading
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setIsLoggedIn(!!user); // Convert to boolean
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLogin();
  }, []);

  // Show loading indicator while checking auth status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // User is logged in
  if (isLoggedIn) {
    return <ProfileScreen />;
  }

  // Not logged in - show either signup or login screen
  return isSignup 
    ? <LoginScreen setIsLoggedIn={setIsLoggedIn} setIsSignup={setIsSignup} />
    : <SignupScreen setIsSignup={setIsSignup} />;
}

