import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  // Exemple de récupération des données depuis AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('username');
        const storedTasks = await AsyncStorage.getItem('tasks');

        if (storedName) setUsername(storedName);

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
      <Text style={styles.header}>Bienvenue, {username} 👋</Text>

      <View style={styles.statsBox}>
        <Text style={styles.statText}>✅ Tâches complètes : {completedCount}</Text>
        <Text style={styles.statText}>❌ Tâches incomplètes : {incompleteCount}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
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
  },
});
