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

// import LinearGradient from 'react-native-linear-gradient';
// import { useState } from 'react';
// import OpponentScreen from './components/guessGame/OpponentScreen';
// import GameStartScreen from './components/guessGame/GameStartScreen';
// import Colors from './constants/colors';
// import GameOverScreen from './components/guessGame/GameOverScreen';

type StatusProp = { trails: number, status: boolean };
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

  // const [userNumber, setUserNumber] = useState(NaN);
  // const [gameIsOver, setGameIsOver] = useState(false);
  // const [trialStatus, setTrailStatus] = useState<StatusProp>({ trails: 0, status: false });

  // const pickedNumberHandler = (pickedNumber: number) => {
  //   setUserNumber(pickedNumber);
  // }

  // const gameOverHandler = (newTrailStatus: StatusProp) => {
  //   setGameIsOver(true);
  //   setTrailStatus(newTrailStatus);
  // } 

  // const startNewGameHandler = ()=>{
  //   setUserNumber(NaN);
  //   setGameIsOver(false);
  // }

  // let screen = <GameStartScreen onPickNumber={pickedNumberHandler} />
  // if (!Number.isNaN(userNumber)) {
  //   screen = (
  //     <OpponentScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  //   );
  // }
  // if (gameIsOver && trialStatus.status) {
  //   screen = <GameOverScreen trailStatus={trialStatus} userNumber={userNumber} onStartNewGame={startNewGameHandler}/>
  // }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <CommUI /> */}
      {/* <ItemList /> */}
      {/* <LinearGradient colors={[Colors.primary600, Colors.accent500]} style={styles.rootStyle}>
        <ImageBackground source={require('./assets/images/background.png')}
          resizeMode='cover' style={styles.rootStyle} imageStyle={styles.bgImgStyle}>
          <SafeAreaView>
            <ScrollView>
              {screen}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient> */}
    </SafeAreaProvider>
  );
}

export default App;