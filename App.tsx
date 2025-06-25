import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './app/Interfaces/SignUp';
import LoginScreen from './app/Interfaces/Login';
import HomeScreen from './home';
import LogoutScreen from './app/Interfaces/Logout';
import { useState } from 'react';

// 1. Créer les stacks
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

// 2. Stack d'authentification
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

// 3. Stack principale
function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen 
        name="Logout" 
        component={LogoutScreen}
        options={{ headerShown: false }} 
      />
    </AppStack.Navigator>
  );
}

// 4. Composant principal
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}