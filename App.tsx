/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View, Button, TextInput, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import CommUI from './components/CommUI';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CommUI />
    </SafeAreaProvider>
  );
}

export default App;