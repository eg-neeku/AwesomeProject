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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesContextProvider } from './src/components/mealNavigation/store/context/favorites-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AllExpenses from './src/components/expenseTracker/screen/AllExpenses';
import RecentExpenses from './src/components/expenseTracker/screen/RecentExpenses';
import ManageExpenses from './src/components/expenseTracker/screen/ManageExpenses';
import Colors from './src/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton } from './src/components/expenseTracker/screen/expensecommon';

import MealDrawerNavigatorScreen from './src/components/mealNavigation/MealDrawerNavigatorScreen';
import ItemList from './src/components/ItemList';
import ExpensesContextProvider from './src/components/expenseTracker/store/expenses-context';
// import ItemList from './components/ItemList'

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

        <ExpensesContextProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ExpensesContextProvider>

      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => (
        {
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "#fff",
          tabBarStyle: { backgroundColor: Colors.primary500 },
          tabBarActiveTintColor: Colors.accent500,
          headerRight: ({ tintColor }) => <IconButton iconname="add" size={24} color={tintColor ? tintColor : "#fff"}
            onPress={() => { navigation.navigate("ManageExpense") }} />
        }
      )}
    >
      <BottomTab.Screen name="RecentExpenses" component={RecentExpenses}
        options={{
          headerTitle: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (<Icon name="calendar" color={color} size={size} />)
        }}
      />
      <BottomTab.Screen name="AllExpenses" component={AllExpenses}
        options={{
          headerTitle: "All Expenses",
          tabBarIcon: ({ color, size }) => (<Icon name="hourglass-outline" color={color} size={size} />)
        }}
      />
    </BottomTab.Navigator>
  )
}

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: "#fff"
    }}>
      <Stack.Screen name="ExpensesOverview" component={BottomTabNavigator}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="ManageExpense" component={ManageExpenses}
        options={{
          presentation: 'modal',
          title: 'Manage Expense'
        }} />
    </Stack.Navigator>
  )
}