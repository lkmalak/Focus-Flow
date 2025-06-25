import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  const settingsOptions = [
    {
      title: 'Compte',
      icon: 'person-outline',
      onPress: () => navigation.navigate('AccountSettings'),
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      ),
    },
    {
      title: 'Thème sombre',
      icon: 'moon-outline',
      rightComponent: (
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      ),
    },
    {
      title: 'Authentification biométrique',
      icon: 'finger-print-outline',
      rightComponent: (
        <Switch
          value={biometricEnabled}
          onValueChange={setBiometricEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      ),
    },
    {
      title: 'Aide & Support',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('Help'),
    },
    {
      title: 'À propos',
      icon: 'information-circle-outline',
      onPress: () => navigation.navigate('About'),
    },
    {
      title: 'Déconnexion',
      icon: 'log-out-outline',
      iconColor: '#e74c3c',
      textColor: '#e74c3c',
      onPress: () => navigation.navigate('Logout'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Paramètres</Text>
      
      {settingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.settingItem}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.itemLeft}>
            <Ionicons
              name={item.icon}
              size={24}
              color={item.iconColor || '#3498db'}
              style={styles.icon}
            />
            <Text style={[styles.itemText, { color: item.textColor || '#333' }]}>
              {item.title}
            </Text>
          </View>
          {item.rightComponent || (
            <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
  },
});

export default SettingsScreen;