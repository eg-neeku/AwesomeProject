/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, ImageBackground, ScrollView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import CategoryScreen from './components/mealNavigation/screens/CategoryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen from './components/mealNavigation/screens/MealsOverviewScreen';
// import { CATEGORIES } from './components/mealNavigation/dummyData';
import MealDetailScreen from './components/mealNavigation/screens/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './components/drawerScreen/WelcomeScreen';
import UserScreen from './components/drawerScreen/UserScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Favourites from './components/mealNavigation/screens/Favourites';
import { FavoritesContextProvider } from './components/mealNavigation/store/context/favorites-context';

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
    // rootStyle: {
    //   flex: 1
    // },
    // bgImgStyle: {
    //   opacity: 0.25,
    // }
    container: {

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
      <FavoritesContextProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </FavoritesContextProvider>

    </SafeAreaProvider>
  );
}

export default App;

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="User"
      screenOptions={{
        headerStyle: { backgroundColor: "#3c0a6b" },
        headerTintColor: "#fff",
        drawerActiveBackgroundColor: "#f0e1ff",
        drawerActiveTintColor: "#3c0a6b",
        drawerStyle: { backgroundColor: "#ccc" },
      }}>
      <Drawer.Screen name="Welcome" component={WelcomeScreen}
        options={{
          drawerLabel: "Welcome Screen",
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )
        }} />
      <Drawer.Screen name="User" component={UserScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          )
        }} />
      <Drawer.Screen name="Meals" component={StackNavigator}
        options={{
          drawerLabel: "Meal Category Lists",
          drawerIcon: ({ color, size }) => (
            <Icon name="food" color={color} size={size} />
          )
        }} />
      <Drawer.Screen name="Favourites" component={Favourites}
        options={{
          drawerLabel: "Favourites Lists",
          drawerIcon: ({ color, size }) => (
            <Icon name="star" color={color} size={size} />
          )
        }} />
    </Drawer.Navigator>
  )
}

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='MealsCategories'
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#3f2f25' }
      }}>
      <Stack.Screen name="MealsCategories" component={CategoryScreen}
        options={{
          title: 'All Categories',
        }} />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen}
      // options={({ route, navigation }: any): any => {
      //   const mealsCategoryId = route.params.categoryId;
      //   const objTitle = CATEGORIES.find(item => item.id === mealsCategoryId)?.foodType;
      //   return {
      //     title: objTitle
      //   }
      // }}
      />
      <Stack.Screen name="MealDetail" component={MealDetailScreen}
      // options={{
      //   headerRight: ()=>{
      //     return <Button title='Tap me' />
      //   }
      // }}
      />
    </Stack.Navigator>
  )
}