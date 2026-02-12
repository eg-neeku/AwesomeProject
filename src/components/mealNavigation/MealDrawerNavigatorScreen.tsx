import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "./screens/CategoryScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import WelcomeScreen from "../drawerScreen/WelcomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import UserScreen from "../drawerScreen/UserScreen";
import Favourites from "./screens/Favourites";
import MainScreen from "../guessGame/MainScreen";
import CommUI from "../CommUI";
import MealDetailScreen from "./screens/MealDetailScreen";


export default function MealDrawerNavigatorScreen() {
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
                        <Icon name="person" color={color} size={size} />
                    )
                }} />
            <Drawer.Screen name="Meals" component={MealStackNavigatorScreen}
                options={{
                    drawerLabel: "Meal Category Lists",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="fast-food-outline" color={color} size={size} />
                    ),
                }} />
            <Drawer.Screen name="Favourites" component={Favourites}
                options={{
                    drawerLabel: "Favourites Lists",
                    drawerIcon: ({ color, size }) => (
                        <Icon name="star" color={color} size={size} />
                    )
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
        </Drawer.Navigator>
    )
}

const MealStackNavigatorScreen = () => {
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