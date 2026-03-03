import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "./screens/CategoryScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import Favourites from "./screens/Favourites";
import MealDetailScreen from "./screens/MealDetailScreen";
import { FavoritesContextProvider } from "./store/context/favorites-context";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";


export default function MealDrawerNavigatorScreen() {
const BottomTab = createNativeBottomTabNavigator();
    return (
        <FavoritesContextProvider>
            <BottomTab.Navigator>
                <BottomTab.Screen name="Meals" component={MealStackNavigatorScreen} />
                <BottomTab.Screen name="Favourites" component={Favourites} />
            </BottomTab.Navigator>
        </FavoritesContextProvider>
    )
}

const MealStackNavigatorScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='MealsCategories'
            screenOptions={{
                headerStyle: { backgroundColor: '#351401' },
                headerTintColor: '#fff',
                contentStyle: { backgroundColor: '#3f2f25', paddingBottom: 100, },
                headerShown: false
            }}>
            <Stack.Screen name="MealsCategories" component={CategoryScreen}
                options={{
                    title: 'All Categories'
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