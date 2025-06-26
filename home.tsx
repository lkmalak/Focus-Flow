import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PomodoroTimer from './Pomodoro';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  // Exemple de récupération des données depuis AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('user');
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedName) {
          const parsedUser = JSON.parse(storedName);
          setUsername(parsedUser.username || '');
        }
        if (storedTasks) {
          const tasks = JSON.parse(storedTasks);
          const completed = tasks.filter(t => t.completed).length;
          const incomplete = tasks.filter(t => !t.completed).length;
          setCompletedCount(completed);
          setIncompleteCount(incomplete);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.header}>Bienvenue {username}. </Text>

      <View >
        <Text style={styles.statText}> 
          
          <Ionicons name="bookmarks" size={24} color="blue"  />    Tâches complètes : {completedCount}</Text>
        <Text style={styles.statText}><Ionicons name="layers" size={24} color="blue" />    Tâches incomplètes : {incompleteCount}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.pomodoros}>
        <PomodoroTimer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statText: {
    fontSize: 18,
    marginBottom: 10,
    padding: 10,
    justifyItems: 'space-between',
    gap: 10
  },
  pomodoros: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
});
