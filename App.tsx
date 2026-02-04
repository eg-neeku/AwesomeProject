/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
// import CommUI from './components/CommUI';
// import ItemList from './components/ItemList'
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import GameScreen from './components/guessGame/GameScreen';
import GameStartScreen from './components/guessGame/GameStartScreen';
import Colors from './constants/colors';

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

  const [userNumber, setUserNumber] = useState(NaN);

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
  }

  let screen = <GameStartScreen onPickNumber={pickedNumberHandler} />
  if (userNumber) {
    screen = <GameScreen />
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <CommUI /> */}
      {/* <ItemList /> */}
      <LinearGradient colors={[Colors.primary600, Colors.accent500]} style={styles.rootStyle}>
        <ImageBackground source={require('./assets/images/background.png')}
          resizeMode='cover' style={styles.rootStyle} imageStyle={styles.bgImgStyle}>
          <SafeAreaView>
            <ScrollView>
              {screen}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

export default App;