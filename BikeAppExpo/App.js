import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import LoginOptionsScreen from './src/screens/LoginOptionsScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PartsScreen from './src/screens/PartsScreen';
import JourneyHistoryScreen from './src/screens/JourneyHistoryScreen';
import MaintenanceHistoryScreen from './src/screens/MaintenanceHistoryScreen';
import JourneyScreen from './src/screens/JourneyScreen';
import ForumScreen from './src/screens/ForumScreen/ForumScreen';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <ForumScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;