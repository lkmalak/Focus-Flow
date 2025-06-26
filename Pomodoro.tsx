import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PomodoroTimer = () => {
  // Paramètres initiaux
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Study');
  const [sessionCount, setSessionCount] = useState(0);
  const [targetSessions, setTargetSessions] = useState(1); // Nouvel état pour le nombre de sessions cible

  // Durées en secondes
  const WORK_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;


  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Temps écoulé
            Vibration.vibrate([500, 500, 500]);
            handleSessionEnd();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleSessionEnd = () => {
    setIsActive(false);
    
    if (sessionType === 'Study') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      
      if (newCount >= targetSessions ) {
        // Toutes les sessions sont complétées
        setSessionType('Terminé');
        setMinutes(0);
        setSeconds(0);
        return;
      }
      
      if (newCount % 2 === 0) {
        setSessionType('Long Pause');
        setMinutes(Math.floor(LONG_BREAK / 60));
      } else {
        setSessionType('Courte Pause');
        setMinutes(Math.floor(SHORT_BREAK / 60));
      }
    } else {
      setSessionType('Study');
      setMinutes(Math.floor(WORK_TIME / 60));
    }
    
    setSeconds(0);
  };

  const toggleTimer = () => {
    if (sessionType !== 'Terminé') {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType('Study');
    setMinutes(Math.floor(WORK_TIME / 60));
    setSeconds(0);
    setSessionCount(0);
  };

  const increaseSessions = () => {
    if (targetSessions < 10) { // Limite à 10 sessions (40 pomodoros)
      setTargetSessions(targetSessions + 1);
    }
  };

  const decreaseSessions = () => {
    if (targetSessions > 1) {
      setTargetSessions(targetSessions - 1);
    }
  };

  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sessionType}>{sessionType}</Text>
      <Text style={styles.timerText}>{formatTime()}</Text>
      
      {/* Nouveau: Contrôle du nombre de sessions */}
      <View style={styles.sessionControl}>
        <TouchableOpacity 
          onPress={decreaseSessions} 
          style={styles.sessionButton}
          disabled={targetSessions <= 1 || isActive}
        >
          <Ionicons name="remove" size={22} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.sessionText}>
          {targetSessions} session{targetSessions > 1 ? 's' : ''} ({(targetSessions ).toFixed(0)} pomodoros)
        </Text>
        
        <TouchableOpacity 
          onPress={increaseSessions} 
          style={styles.sessionButton}
          disabled={targetSessions >= 10 || isActive}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          onPress={toggleTimer} 
          style={styles.button}
          disabled={sessionType === 'Terminé'}
        >
          <Ionicons 
            name={isActive ? 'pause' : 'play'} 
            size={32} 
            color="#fff" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={resetTimer} style={styles.button}>
          <Ionicons name="refresh" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sessionCount}>
        Sessions complétées: {sessionCount}/{targetSessions }
      </Text>
      
      {sessionType === 'Terminé' && (
        <Text style={styles.completionText}>Objectif atteint ! 🎉</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    padding: 10,
    margin: 0,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sessionType: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  sessionControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sessionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  sessionText: {
    fontSize: 16,
    color: '#fff',
    minWidth: 200,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 50,
  },
  sessionCount: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  completionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default PomodoroTimer;