import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  const openWebsite = () => {
    Linking.openURL('https://votre-site.com');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://votre-site.com/privacy');
  };

  const openTerms = () => {
    Linking.openURL('https://votre-site.com/terms');
  };

  const contactSupport = () => {
    Linking.openURL('mailto:support@votre-site.com');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>À propos de l'application</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>
          Notre application est conçue pour vous offrir la meilleure expérience utilisateur.
          Développée avec React Native, elle combine performance et élégance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liens utiles</Text>
        <TouchableOpacity style={styles.linkItem} onPress={openWebsite}>
          <Ionicons name="globe-outline" size={22} color="#3498db" />
          <Text style={styles.linkText}>Site web officiel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem} onPress={openPrivacyPolicy}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#3498db" />
          <Text style={styles.linkText}>Politique de confidentialité</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkItem} onPress={openTerms}>
          <Ionicons name="document-text-outline" size={22} color="#3498db" />
          <Text style={styles.linkText}>Conditions d'utilisation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TouchableOpacity style={styles.linkItem} onPress={contactSupport}>
          <Ionicons name="mail-outline" size={22} color="#3498db" />
          <Text style={styles.linkText}>Support technique</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2023 Votre Société. Tous droits réservés.</Text>
      </View>
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
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    color: '#777',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  linkText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#3498db',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#999',
  },
});

export default AboutScreen;