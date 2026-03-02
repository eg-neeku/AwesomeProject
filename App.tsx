/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, useColorScheme, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesContextProvider } from './src/components/mealNavigation/store/context/favorites-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MealDrawerNavigatorScreen from './src/components/mealNavigation/MealDrawerNavigatorScreen';
import ItemList from './src/components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feature from './src/Feature';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ItemList /><Text>This Thing UPDATE LOgin has to be implmented </Text> */}
        <NavigationContainer>
          <Feature />

        {/* <BusDrawerScreen />*/}

        {/* <TestThis /> */}

          </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

const TestThis = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", padding: 2, marginVertical: 45 }}>
      <Text style={{ color: "#000", fontSize: 45 }}>Does this works </Text>
    </View>
  )
}