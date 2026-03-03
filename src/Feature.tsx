import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./components/drawerScreen/WelcomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import MealDrawerNavigatorScreen from "./components/mealNavigation/MealDrawerNavigatorScreen";
import ExpenseAppStackNavigator from "./components/expenseTracker/ExpenseAppStackNavigator";
import MainScreen from "./components/guessGame/MainScreen";
import CommUI from "./components/CommUI";
import BusDrawerScreen from "./components/busApp/screen/BusDrawerScreen";

export default function Feature() {
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
            <Drawer.Screen name="MealsApp" component={MealDrawerNavigatorScreen}
                options={{
                    drawerLabel: "Meals Management",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="fast-food-outline" color={color} size={size} />
                    ),
                }} />
            <Drawer.Screen name="ExpenseApp" component={ExpenseAppStackNavigator}
                options={{
                    drawerLabel: "Expense Management",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="receipt" color={color} size={size} />
                    ),
                }} />
            <Drawer.Screen name="GameGuess" component={MainScreen}
                options={{
                    drawerLabel: "Guess Game",
                    drawerIcon: ({ size, color }) => (<Icon name="trail-sign" size={size} color={color} />)
                }} />
            <Drawer.Screen name="UIElements" component={CommUI}
                options={{
                    drawerLabel: "UI Elements",
                    drawerIcon: ({ size, color }) => (<Icon name="build-sharp" color={color} size={size} />)
                }} />
            <Drawer.Screen name="BusDrawerScreen" component={BusDrawerScreen}
                options={{
                    drawerLabel: "Bus App",
                    drawerIcon: ({ size, color }) => (<Icon name="bus-sharp" color={color} size={size} />)
                }} />
        </Drawer.Navigator>
    )
}