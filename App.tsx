/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { ImageBackground, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
// import CommUI from './components/CommUI';
// import ItemList from './components/ItemList';
import GuessGame from './components/GuessGame';
import LinearGradient from 'react-native-linear-gradient';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = StyleSheet.create({
    rootStyle: {
      flex: 1
    },
    bgImgStyle: {
      opacity: 0.25,
    }
  });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <CommUI /> */}
      {/* <ItemList /> */}
      <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootStyle}>
        <ImageBackground source={require('./assets/images/background.png')}
          resizeMode='cover' style={styles.rootStyle} imageStyle={styles.bgImgStyle}>
          <GuessGame />
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

export default App;