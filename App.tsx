/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
// import CommUI from './components/CommUI';
// import ItemList from './components/ItemList';
import GuessGame from './components/GuessGame';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <CommUI /> */}
      {/* <ItemList /> */}
      <GuessGame />
    </SafeAreaProvider>
  );
}

export default App;