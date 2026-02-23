/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, useColorScheme, Text } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesContextProvider } from './src/components/mealNavigation/store/context/favorites-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MealDrawerNavigatorScreen from './src/components/mealNavigation/MealDrawerNavigatorScreen';
import ItemList from './src/components/ItemList';
import ExpensesContextProvider from './src/components/expenseTracker/store/expenses-context';
import ExpenseAppStackNavigator from './src/components/expenseTracker/ExpenseAppStackNavigator';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/components/demologreg/screen/Login';
import { Signup } from './src/components/demologreg/screen/Signup';
// import Colors from './src/constants/colors';
import WelcomeScreen from './src/components/drawerScreen/WelcomeScreen';
import { AuthContext, AuthContextProvider } from './src/components/demologreg/store/auth-context';
import { useContext, useEffect } from 'react';
import IconButton from './src/components/demologreg/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#62036b" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#d000dd", }
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#62036b" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#d000dd", }
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout} />
          )
        }} />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    }
    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ItemList /><Text>This Thing UPDATE LOgin has to be implmented </Text> */}
        {/* <FavoritesContextProvider>
          <NavigationContainer>
          <MealDrawerNavigatorScreen />
          </NavigationContainer>
          </FavoritesContextProvider> */}

        {/* <ExpensesContextProvider>
          <NavigationContainer>
          <ExpenseAppStackNavigator />
          </NavigationContainer>
          </ExpensesContextProvider> */}

        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>

      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

