import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AllExpenses from './screen/AllExpenses';
import RecentExpenses from './screen/RecentExpenses';
import ManageExpenses from './screen/ManageExpenses';
import Colors from '../../constants/colors';
import { IconButton } from './screen/expensecommon';

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

const ExpenseAppStackNavigator = () => {
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

export default ExpenseAppStackNavigator;