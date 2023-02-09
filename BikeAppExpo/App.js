import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import LoginOptionsScreen from './src/screens/LoginOptionsScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <HomeScreen />
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